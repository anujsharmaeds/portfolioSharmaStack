import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Replace text colors
  const regexes = [
    /text-(gray|slate|zinc|neutral|stone)-\d+/g,
    /dark:text-(gray|slate|zinc|neutral|stone)-\d+/g,
    /text-black/g,
    /dark:text-white/g
  ];

  regexes.forEach(regex => {
    newContent = newContent.replace(regex, 'text-white');
  });

  // Clean up duplicate text-white if it happened (e.g. "text-white text-white")
  newContent = newContent.replace(/text-white text-white/g, 'text-white');
  newContent = newContent.replace(/text-white text-white text-white/g, 'text-white');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated text colors in ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(SRC_DIR);
console.log('Done replacing text colors with white in src/');
