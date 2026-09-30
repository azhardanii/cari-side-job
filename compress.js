const sharp = require('./node_modules/sharp');
const fs = require('fs');

const inputPath = 'C:\\Users\\SADzzz\\.gemini\\antigravity-ide\\brain\\d22624e3-5a02-4caf-ae7e-40ecd34d3fa9\\.user_uploaded\\media_1790428556252.png';
const outputPath = 'public\\logo.webp';

sharp(inputPath)
  .webp({ quality: 100, lossless: true })
  .toFile(outputPath)
  .then(() => console.log('Successfully created logo.webp'))
  .catch(err => console.error('Error creating logo.webp:', err));

sharp(inputPath)
  .resize(32, 32)
  .png()
  .toFile('src\\app\\icon.png')
  .then(() => console.log('Successfully created icon.png'))
  .catch(err => console.error('Error creating icon.png:', err));
