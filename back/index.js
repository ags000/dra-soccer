require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const createDirectories = require('./utils/createfolders');
const path = require('path');
const { Apicache } = require('./models');
const cheerio = require('cheerio')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
        title: "REWINDF API DOCS",
        version: "1.0.0",
        description: "API Information"
    },
    servers: [
        {
          url: process.env.API_DOMAIN
        }
    ]
  },
  apis: ['./routes/*.js', './index.js']
}



createDirectories();
const app = express();
app.set('trust proxy', 1); 
app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJSDoc(options);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const teamPhotosPath = path.join(__dirname, 'team-photos');
app.use('/team-photos', express.static(teamPhotosPath));

const playerPhotosPath = path.join(__dirname, 'player-photos');
app.use('/player-photos', express.static(playerPhotosPath));




/*
  ROUTES
*/
const teamRoutes = require('./routes/TeamRoutes');
app.use('/api/teams', teamRoutes);

const playerRoutes = require('./routes/PlayerRoutes');
app.use('/api/players', playerRoutes);


/**
 * @swagger
 * /api/feed:
 *   get:
 *     summary: Endpoint used to obtain latest videos.
 *     description: Endpoint used to obtain latest videos.
 *     responses:
 *       200:
 *         description: ok
 *       500:
 *         description: internal server error
 */
app.get('/api/feed', async (req, res) => {

  try {
    const actualDate = new Date();
    const formattedDate = actualDate.toISOString().split('T')[0];


    const lastCached = await Apicache.findOne({
      where: {
        date: formattedDate
      }
    });

    if (lastCached) {
      return res.status(200).json(lastCached.response);
    }

    const fetch = await axios.get(`https://www.scorebat.com/video-api/v3/feed/?token=${process.env.VIDEO_API}`)

    await Apicache.create({
      date: formattedDate,
      response: fetch.data
    });

    return res.status(200).json(fetch.data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

/**
 * @swagger
 * /api/laliga:
 *   get:
 *     summary: Returns laliga table
 *     description: Returns laliga table
 *     responses:
 *       200:
 *         description: ok
 *       500:
 *         description: internal server error
 */
app.get('/api/laliga', async (req, res) => {
  try {
   const fetch = await axios.get('https://resultados.as.com/resultados/futbol/primera/clasificacion/');
   const $ = cheerio.load(fetch.data);

   const tableRows = $('table > tbody > tr');

   let tableData = [];

   tableRows.each((i, row) => {
    let rowData = [];
    
    const imgDataSrc = $(row).find('th a span img').attr('data-src');
    const teamName = $(row).find('th a span').text().trim();

    rowData.push(imgDataSrc);
    rowData.push(teamName);
     
     $(row).find('td').each((j, cell) => {
       rowData.push($(cell).text().trim());
     });
     tableData.push(rowData);
   });

  //  console.log(tableData);


    return res.status(200).json(tableData);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});



app.listen(80, '0.0.0.0', () => {
  console.log('Server is running on port 80');
});