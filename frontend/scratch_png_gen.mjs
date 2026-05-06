import sharp from 'sharp';
import path from 'path';

async function main() {
  const svgPath = path.resolve('./public/favicon.svg');
  
  // Create 96x96 PNG
  await sharp(svgPath)
    .resize(96, 96)
    .png()
    .toFile(path.resolve('./public/favicon-96x96.png'));
  console.log('Created favicon-96x96.png');

  // Create 180x180 Apple Touch Icon
  await sharp(svgPath)
    .resize(180, 180)
    .png()
    .toFile(path.resolve('./public/apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');
  
  // Create favicon.ico (using 48x48 png as ico base is widely supported)
  // Sharp can't natively output .ico, but we can output a 48x48 png 
  // and just name it .ico for some simple web servers, or use standard PNG.
  // We'll generate a 48x48 png
  await sharp(svgPath)
    .resize(48, 48)
    .png()
    .toFile(path.resolve('./public/favicon.ico'));
  console.log('Created favicon.ico');
}

main().catch(console.error);
