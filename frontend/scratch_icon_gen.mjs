import fs from 'fs';
import path from 'path';

async function main() {
  const svgPath = path.resolve('./public/sharmaStack_S_allwork.svg');
  const destPath = path.resolve('./public/favicon.svg');
  let content = fs.readFileSync(svgPath, 'utf8');

  // Replace viewBox
  content = content.replace(/viewBox="0 0 680 480"/, 'viewBox="0 0 680 680"');

  // Add the transform group
  const insertStart = content.indexOf('<!-- ════════════════════════════════');
  if (insertStart > -1) {
    content = content.slice(0, insertStart) + '<g transform="translate(0, 100)">\n  ' + content.slice(insertStart);
    content = content.replace('</svg>', '</g>\n</svg>');
    fs.writeFileSync(destPath, content);
    console.log('Successfully created favicon.svg');
  } else {
    console.log('Could not find insert point');
    return;
  }
}

main().catch(console.error);
