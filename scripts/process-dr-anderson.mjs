#!/usr/bin/env node
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');
const thumbsDir = path.join(imagesDir, 'thumbs');

async function processNewImage(filename) {
  const inputPath = path.join(imagesDir, filename);
  
  // Check if JPG exists
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ ${filename} not found. Please save the image first.`);
    return;
  }
  
  const baseName = filename.replace('.jpg', '');
  const webpPath = path.join(imagesDir, `${baseName}.webp`);
  const thumbPath = path.join(thumbsDir, `${baseName}-180.webp`);
  
  try {
    // Create WebP version
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    console.log(`✅ Created: ${baseName}.webp`);
    
    // Create thumbnail
    await sharp(inputPath)
      .resize(180, 180, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(thumbPath);
    console.log(`✅ Created: ${baseName}-180.webp`);
    
  } catch (error) {
    console.error(`❌ Failed to process ${filename}:`, error.message);
  }
}

// Process Dr. Claud Anderson image
(async () => {
  console.log('Processing Dr. Claud Anderson image...\n');
  await processNewImage('Dr_Claud_Anderson.jpg');
  console.log('\n✨ Done!');
})();