#!/usr/bin/env node
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');

const artistDir = process.argv[2];
const input = process.argv[3];
const onlyWebp = process.argv.includes('--only-webp');

if (!artistDir || !input) {
  console.error('Usage: node scripts/process-profile.mjs <ArtistDirName> <inputImagePath> [--only-webp]');
  process.exit(1);
}

const destDir = path.join(imagesDir, 'artists', artistDir);
fs.mkdirSync(destDir, { recursive: true });

const outJpg = path.join(destDir, 'profile.jpg');
const outWebp = path.join(destDir, 'profile.webp');

(async () => {
  try {
    // Center-crop square then resize to 240x240 for consistency
    const srcPath = path.resolve(input);
    const outJpgPath = path.resolve(outJpg);

    // Prepare pipeline
    const pipeline = sharp(srcPath).resize(240, 240, { fit: 'cover', position: 'centre' });

    // If input equals output JPG and we're not explicitly asked to overwrite, skip writing JPG
    if (onlyWebp || srcPath === outJpgPath) {
      // Generate only WebP from the provided input without touching existing JPG
      await pipeline.webp({ quality: 82 }).toFile(outWebp);
      console.log(`✅ Created profile.webp at ${destDir} (left existing profile.jpg untouched)`);
    } else {
      // Write both JPG and WebP
      await pipeline.jpeg({ quality: 88 }).toFile(outJpg);
      await sharp(outJpg).webp({ quality: 82 }).toFile(outWebp);
      console.log(`✅ Created profile images at ${destDir}`);
    }
  } catch (err) {
    console.error('❌ Failed to process profile image:', err.message);
    process.exit(1);
  }
})();
