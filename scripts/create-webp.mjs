#!/usr/bin/env node
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');

const missingWebP = [
  'Copy_of_Gravey.jpg',
  'Copy_of_Lillia_s_mom.jpg',
  'Copy_of_pam_mom_2.jpg',
  'Frans_grand_mother.jpg',
  'Jeanneta_art.jpg',
  'Malcom_X.jpg',
  'Mrs_Annies_Nience.jpg',
  'Page 30.jpg'
];

async function convertToWebP(filename) {
  const inputPath = path.join(imagesDir, filename);
  const outputPath = path.join(imagesDir, filename.replace('.jpg', '.webp'));
  
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    console.log(`✅ Created: ${filename.replace('.jpg', '.webp')}`);
  } catch (error) {
    console.error(`❌ Failed to convert ${filename}:`, error.message);
  }
}

(async () => {
  console.log('Creating WebP versions of artist page images...\n');
  
  for (const file of missingWebP) {
    await convertToWebP(file);
  }
  
  console.log('\n✨ Done!');
})();
