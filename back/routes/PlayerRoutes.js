const express = require('express');
const uploaPlayerImage = require('../utils/uploadPlayerImage');
const { createPlayer, getPlayerTeam, deletePlayer } = require('../controllers/PlayerController');

const router = express.Router();

/**
 * @swagger
 * /api/players:
 *   post:
 *     tags:
 *       - Players
 *     summary: create a player
 *     description: create a team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - teamId
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 description: player name
 *               teamId:
 *                 type: integer
 *                 description: team id
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: player image
 *     responses:
 *       200:
 *         description: ok
 *       500:
 *         description: internal server error
 */
router.post('/', uploaPlayerImage, createPlayer);

/**
 * @swagger
 * /api/players/team/{idTeam}:
 *   get:
 *     tags:
 *       - Players
 *     summary: Endpoint used to  retrieve a team's players.
 *     description: Endpoint used to  retrieve a team's players.
 *     responses:
 *       200:
 *         description: ok
 *       500:
 *         description: internal server error
 */
router.get('/team/:idTeam', getPlayerTeam);

/**
 * @swagger
 * /api/players/{id}:
 *   delete:
 *     tags:
 *       - Players
 *     summary: deletes a player.
 *     description: deletes a player.
 *     responses:
 *       204:
 *         description: ok
 *       404:
 *         description: player not found
 *       500:
 *         description: internal server error
 */
router.delete('/:id', deletePlayer);

module.exports = router;