const sharp = require('./node_modules/sharp');
const fs = require('fs');

const inputPath = 'C:\\Users\\SADzzz\\.gemini\\antigravity-ide\\brain\\d22624e3-5a02-4caf-ae7e-40ecd34d3fa9\\.user_uploaded\\media_1790428556252.png';
const outputPath = 'public\\logo.webp';

sharp(inputPath)
  .trim() // Automatically crops away borders of similar color (default transparent/white)
  .webp({ quality: 100, lossless: true })
  .toFile(outputPath)
  .then(info => {
    console.log('Successfully trimmed and created logo.webp', info);
  })
  .catch(err => {
    console.error('Error creating logo.webp:', err);
  });
