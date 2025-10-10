#!/usr/bin/env node
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');

const artistDir = process.argv[2];
const input = process.argv[3];

if (!artistDir || !input) {
  console.error('Usage: node scripts/process-profile.mjs <ArtistDirName> <inputImagePath>');
  process.exit(1);
}

const destDir = path.join(imagesDir, 'artists', artistDir);
fs.mkdirSync(destDir, { recursive: true });

const outJpg = path.join(destDir, 'profile.jpg');
const outWebp = path.join(destDir, 'profile.webp');

(async () => {
  try {
    // Center-crop square then resize to 240x240 for consistency
    const image = sharp(input).resize(240, 240, { fit: 'cover', position: 'centre' });

    await image.jpeg({ quality: 88 }).toFile(outJpg);
    await image.webp({ quality: 82 }).toFile(outWebp);

    console.log(`✅ Created profile images at ${destDir}`);
  } catch (err) {
    console.error('❌ Failed to process profile image:', err.message);
    process.exit(1);
  }
})();
