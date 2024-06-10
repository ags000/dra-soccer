const fs = require('fs');
const path = require('path');

const directories = ['team-photos', 'player-photos'];

const createDirectories = () => {
  try {
    directories.forEach((dir) => {
      const dirPath = path.join(__dirname, '..', dir);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`La carpeta '${dir}' fue creada.`);
      }
    });
  } catch (e) {
    throw new Error('Server has exited because it was not able to create directories.');
  }
};

module.exports = createDirectories;
