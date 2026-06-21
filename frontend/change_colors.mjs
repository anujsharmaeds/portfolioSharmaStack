import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Replace gradients
  newContent = newContent.replace(/from-green-(\d+)/g, 'from-orange-$1');
  newContent = newContent.replace(/to-green-(\d+)/g, 'to-orange-$1');
  newContent = newContent.replace(/via-green-(\d+)/g, 'via-orange-$1');
  newContent = newContent.replace(/from-emerald-(\d+)/g, 'from-orange-$1');
  newContent = newContent.replace(/to-emerald-(\d+)/g, 'to-orange-$1');
  newContent = newContent.replace(/via-emerald-(\d+)/g, 'via-orange-$1');

  // Replace remaining specific colors
  newContent = newContent.replace(/green-(\d+)/g, 'orange-$1');
  newContent = newContent.replace(/emerald-(\d+)/g, 'orange-$1');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
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
console.log('Done replacing green and emerald colors in src/');
