const express = require('express');
const uploadImage = require('../utils/uploadImage');

const { createTeam, getTeams, deleteTeam, getTeam, updateTeam, updateTeamImage } = require('../controllers/TeamController');

const router = express.Router();

/**
 * @swagger
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     summary: create a team
 *     description: create a team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 description: player name
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: player image
 *     responses:
 *       201:
 *         description: created
 *       400:
 *         description: missing required fields
 *       500:
 *         description: internal server error
 */
router.post('/', uploadImage, createTeam);

/**
 * @swagger
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Retrieve all teams
 *     description: Retrieve all teams
 *     responses:
 *       200:
 *         description: ok
 *       500:
 *         description: internal server error
 */
router.get('/', getTeams);

/**
 * @swagger
 * /api/teams/{id}:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Retrieve a team
 *     description: Retrieve a team
 *     responses:
 *       200:
 *         description: ok
 *       400:
 *         description: id is missing
 *       404:
 *         description: team not found
 *       500:
 *         description: internal server error
 */
router.get('/:id', getTeam);

/**
 * @swagger
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     summary: deletes a team.
 *     description: deletes a team.
 *     responses:
 *       204:
 *         description: ok
 *       404:
 *         description: player not found
 *       500:
 *         description: internal server error
 */
router.delete('/:id', deleteTeam);

/**
 * @swagger
 * /api/teams:
 *   put:
 *     tags:
 *       - Teams
 *     summary: update a team
 *     description: update a team without changing its image!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - id
 *             properties:
 *               name:
 *                 type: string
 *                 description: new team name
 *               id:
 *                 type: integer
 *                 description: team id
 *     responses:
 *       201:
 *         description: created
 *       400:
 *         description: missing required fields
 *       500:
 *         description: internal server error
 */
router.put('/', updateTeam);

/**
 * @swagger
 * /api/teams:
 *   patch:
 *     tags:
 *       - Teams
 *     summary: update a team
 *     description: update a team changing its image!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - id
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 description: new team name
 *               id:
 *                 type: integer
 *                 description: team id
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: new team image
 *     responses:
 *       201:
 *         description: created
 *       400:
 *         description: missing required fields
 *       500:
 *         description: internal server error
 */
router.patch('/', uploadImage, updateTeamImage);

module.exports = router;