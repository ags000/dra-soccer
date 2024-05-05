require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');


const { Apicache } = require('./models');
const cheerio = require('cheerio')

const app = express();
app.use(cors());


app.use(express.json());

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



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});