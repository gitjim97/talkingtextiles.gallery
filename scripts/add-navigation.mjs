#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const artistPages = [
  'copy_of_pam_mom_2',
  'Daddy', 
  'frans_grand_mother',
  'Jeanneta_art',
  'Kamala',
  'lillia_s_mom',
  'Malcom_X',
  'Mama',
  'mrs_annies_nience',
  'Nigel',
  'Page_30',
  'Untitled-1'
];

for (const page of artistPages) {
  const filePath = `src/pages/artist_pages/${page}.astro`;
  console.log(`Processing ${filePath}...`);
  
  try {
    let content = readFileSync(filePath, 'utf-8');
    
    // Add import to the frontmatter
    if (!content.includes('ArtistNavigation')) {
      content = content.replace(
        /import Layout from '\.\.\/\.\.\/layouts\/Layout\.astro';/,
        `import Layout from '../../layouts/Layout.astro';\nimport ArtistNavigation from '../../components/ArtistNavigation.astro';`
      );
      
      // Add navigation component before closing main and Layout tags
      content = content.replace(
        /(\s*)<\/main>\s*<\/Layout>/,
        '$1  \n    <ArtistNavigation />\n  </main>\n</Layout>'
      );
      
      writeFileSync(filePath, content);
      console.log(`✓ Updated ${filePath}`);
    } else {
      console.log(`- ${filePath} already has navigation`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

console.log('Navigation added to all artist pages!');
