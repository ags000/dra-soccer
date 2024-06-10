const { Team } = require('../models');

const createTeam = async (req, res) => {
  const { name } = req.body;
  const image = req.file;

  if (!name || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const team = await Team.create({
      name,
      image: image.filename,
    });

    return res.status(201).json(team);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

const getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    return res.status(200).json(teams);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    await team.destroy();

    return res.status(204).json({ message: 'Team deleted' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }

}

const getTeam = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    return res.status(200).json(team);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

const updateTeam = async (req, res) => {
  try {
    const { name, id } = req.body;

    if (!id || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    team.name = name;

    await team.save();

    return res.status(200).json(team);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

const updateTeamImage = async (req, res) => {
  try {
    const { name, id } = req.body;
    const image = req.file;

    if (!id || !name || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    team.name = name;
    team.image = image.filename;

    await team.save();

    return res.status(200).json(team);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }

}

module.exports = {
  createTeam,
  getTeams,
  deleteTeam,
  getTeam,
  updateTeam,
  updateTeamImage,
};