const { Player } = require('../models');

const createPlayer = async (req, res) => {
  const { name, teamId } = req.body;
  const image = req.file;

  if (!name || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const player = await Player.create({
      name,
      photo: image.filename,
      teamId,
    });

    return res.status(201).json(player);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

const getPlayerTeam = async (req, res) => {
  const { idTeam } = req.params;

  try {
    const players = await Player.findAll({
      where: {
        teamId: idTeam
      }
    });

    return res.status(200).json(players);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await Player.findByPk(id);

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    await player.destroy();

    return res.status(204).send();

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }

}


module.exports = { createPlayer, getPlayerTeam, deletePlayer };