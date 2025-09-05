#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const OUT_THUMBS = path.join(IMAGES_DIR, 'thumbs');
const OUT_HERO = path.join(IMAGES_DIR, 'hero');

const allowed = new Set(['.jpg', '.jpeg', '.png']);

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip output folders and nested galleries like 'show'
      if (['thumbs', 'hero'].includes(entry.name)) continue;
      yield* walk(res);
    } else {
      yield res;
    }
  }
}

function baseName(file) {
  const ext = path.extname(file);
  return path.basename(file, ext);
}

async function optimizeOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (!allowed.has(ext)) return;
  const name = baseName(file);
  const rel = path.relative(IMAGES_DIR, file);
  // Skip files that are inside excluded subfolders (like show/)
  if (rel.split(path.sep)[0] === 'show') return;

  const thumbOut = path.join(OUT_THUMBS, `${name}-180.webp`);
  const heroOut = path.join(OUT_HERO, `${name}-1600.webp`);

  await ensureDir(path.dirname(thumbOut));
  await ensureDir(path.dirname(heroOut));

  const img = sharp(file);
  // Generate thumbnail
  await img
    .resize({ width: 180, height: 180, fit: 'cover', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbOut);

  // Generate hero
  await sharp(file)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(heroOut);

  console.log('Optimized:', path.relative(ROOT, file));
}

(async () => {
  await ensureDir(OUT_THUMBS);
  await ensureDir(OUT_HERO);
  for await (const f of walk(IMAGES_DIR)) {
    try {
      await optimizeOne(f);
    } catch (e) {
      console.error('Failed optimizing', f, e);
    }
  }
  console.log('Done. Thumbs in /public/images/thumbs, hero in /public/images/hero');
})();
