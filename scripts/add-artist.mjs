#!/usr/bin/env node
/**
 * Paste a single block of text and this script will parse and create a markdown file
 * Usage: node scripts/add-artist.mjs <<'END'
 * Artist: Angela Davis
 * Title: Angela Davis Textile Portrait
 * Artwork Title: Resistance in Fabric
 * Hero Image: /images/Angela_Davis.jpg
 * Thumb: /images/thumbs/Angela_Davis-180.webp
 * Year: 2024
 * Materials: Cotton, batik prints, machine stitching
 * Keywords: textile art, portrait, cultural narrative
 * Artist Bio:
 *   Angela Davis is represented ...
 * Artwork Description:
 *   This portrait uses appliqué ...
 * END
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = await new Promise(res => {
  let data = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', c => data += c);
  process.stdin.on('end', () => res(data.trim()));
});

if (!input) {
  console.error('No input provided.');
  process.exit(1);
}

// Simple parser: lines with Key: Value; multi-line sections for Artist Bio / Artwork Description
const lines = input.split(/\r?\n/);
const data = {};
let currentMulti = null;
for (let raw of lines) {
  const line = raw.trimEnd();
  if (!line) continue;
  if (/^(Artist Bio|Artwork Description):\s*$/i.test(line)) {
    currentMulti = line.split(':')[0];
    data[currentMulti] = '';
    continue;
  }
  const m = line.match(/^([A-Za-z ]+):\s*(.*)$/);
  if (m && !currentMulti) {
    const key = m[1].trim();
    const val = m[2].trim();
    data[key] = val;
  } else if (currentMulti) {
    if (/^[A-Za-z ]+:\s*$/.test(line)) { // new header starts
      currentMulti = null; // will re-process this line
    } else {
      data[currentMulti] += (data[currentMulti] ? '\n' : '') + line;
    }
  }
}

function norm(key) {
  return key.toLowerCase().replace(/\s+/g,'');
}

const slug = (data['Slug'] || data['Artist'] || 'artist').replace(/[^A-Za-z0-9_-]+/g,'_');
const artistName = data['Artist'] || slug;
const frontMatter = {
  slug,
  artistName,
  title: data['Title'] || undefined,
  artworkTitle: data['Artwork Title'] || undefined,
  artistBio: data['Artist Bio'] || 'Artist biography pending.',
  artworkDescription: data['Artwork Description'] || undefined,
  heroImage: data['Hero Image'] || undefined,
  thumb: data['Thumb'] || undefined,
  year: data['Year'] || undefined,
  materials: data['Materials'] || undefined,
  keywords: data['Keywords'] ? data['Keywords'].split(/,\s*/).filter(Boolean) : undefined
};

const outDir = path.join(__dirname, '../src/content/artists');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const filePath = path.join(outDir, `${slug}.md`);

const yaml = Object.entries(frontMatter)
  .filter(([,v]) => v !== undefined && v !== '')
  .map(([k,v]) => {
    if (Array.isArray(v)) return `${k}:\n  - ${v.join('\n  - ')}`;
    const needsBlock = /\n/.test(v);
    if (needsBlock) return `${k}: |\n  ${v.split('\n').join('\n  ')}`;
    return `${k}: ${v}`;
  }).join('\n');

fs.writeFileSync(filePath, `---\n${yaml}\n---\n`);
console.log(`Created artist file: ${filePath}`);
