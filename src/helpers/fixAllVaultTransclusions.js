const fs = require('fs');
const path = require('path');

function getMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  let subdirs = fs.readdirSync(dir);
  let files = [];
  for (let file of subdirs) {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getMdFiles(fullPath));
    } else if (file.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Build map of activity title -> slug from site Act directory
const siteActDir = '/home/haseeb/Personal-Dev/Shabab-Skills/shabab/src/site/notes/Act';
const actFiles = fs.readdirSync(siteActDir).filter(f => f.endsWith('.md'));
const titleToSlug = {};

for (const actFile of actFiles) {
  const slug = actFile.replace('.md', '');
  const content = fs.readFileSync(path.join(siteActDir, actFile), 'utf8');
  
  const nameMatch = content.match(/^name:\s*"?([^"\n]+)"?/m);
  if (nameMatch) {
    titleToSlug[nameMatch[1].trim().toLowerCase()] = slug;
  }
  const h3Match = content.match(/^###\s+(.+)$/m);
  if (h3Match) {
    titleToSlug[h3Match[1].trim().toLowerCase()] = slug;
  }
}

// Add manual aliases if needed
titleToSlug['breach & clear'] = 'breach-and-clear';
titleToSlug['operation: virtue scrolls'] = 'operation-virtue-scrolls';
titleToSlug['simple dodgeball'] = 'simple-dodgeball';
titleToSlug['teen ball'] = 'teen-ball';

const vaultFiles = getMdFiles('/mnt/d/Shabab');
let fixedCount = 0;

for (const filePath of vaultFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('transclusion internal-embed')) continue;

  const transclusionRegex = /<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">[\s\S]*?###\s+([^\n\r]+)[\s\S]*?<\/div><\/div>/gi;

  const newContent = content.replace(transclusionRegex, (match, title) => {
    const cleanTitle = title.trim().toLowerCase();
    const slug = titleToSlug[cleanTitle];
    if (slug) {
      return `![[${slug}]]`;
    }
    console.log(`Warning: slug not found for title "${title}" in file: ${filePath}`);
    return match;
  });

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    fixedCount++;
    console.log(`Fixed vault transclusions in: ${filePath}`);
  }
}

console.log(`Successfully fixed vault transclusions across ${fixedCount} files in D:\\Shabab.`);
