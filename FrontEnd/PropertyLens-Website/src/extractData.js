import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { housesData } from './Data.jsx';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Remove image properties and create new object
const cleanedData = {
  houses: housesData.map(({ image, imageLg, ...house }) => house)
};

// Create directory if it doesn't exist
const dir = path.join(__dirname, 'data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Write to JSON file
fs.writeFileSync(
  path.join(dir, 'houseData.json'),
  JSON.stringify(cleanedData, null, 2),
  'utf8'
);

console.log('House data has been successfully extracted to houseData.json');