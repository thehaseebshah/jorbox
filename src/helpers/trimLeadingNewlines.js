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

const siteFiles = getMdFiles('/home/haseeb/Personal-Dev/Shabab-Skills/shabab/src/site/notes');
const vaultFiles = getMdFiles('/mnt/d/Shabab');
const allFiles = Array.from(new Set([...siteFiles, ...vaultFiles]));

let modifiedCount = 0;

for (const filePath of allFiles) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip leading empty lines / whitespace from very beginning of file
  const trimmedLeading = content.replace(/^[\s\r\n]+(?=---)/g, '').replace(/^[\s\r\n]+(?=#)/g, '');

  if (trimmedLeading !== content) {
    fs.writeFileSync(filePath, trimmedLeading, 'utf8');
    modifiedCount++;
    console.log(`Trimmed leading newlines in: ${filePath}`);
  }
}

console.log(`Successfully trimmed leading newlines at start of file across ${modifiedCount} files.`);
