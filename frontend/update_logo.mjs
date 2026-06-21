import fs from 'fs';
import path from 'path';

const logoPath = path.join(process.cwd(), 'public', 'sharmaStack_S_allwork.svg');

let svg = fs.readFileSync(logoPath, 'utf8');

const colorMap = {
  'rgb(4, 44, 83)': '#431407',
  'rgb(2, 30, 58)': '#7c2d12',
  'rgb(12, 68, 124)': '#c2410c',
  'rgb(8, 52, 96)': '#9a3412',
  'rgb(24, 95, 165)': '#ea580c',
  'rgb(13, 74, 130)': '#c2410c',
  'rgb(55, 138, 221)': '#f97316',
  'rgb(133, 183, 235)': '#fdba74',
  'rgb(181, 212, 244)': '#ffedd5',
  'rgb(250, 199, 117)': '#ea580c',
  'rgb(240, 153, 123)': '#fb923c',
  'rgb(175, 169, 236)': '#f97316',
  'rgb(93, 202, 165)': '#fdba74',
  'rgb(230, 241, 251)': '#ffffff'
};

for (const [oldColor, newColor] of Object.entries(colorMap)) {
  const regex = new RegExp(oldColor.replace(/[()]/g, '\\$&'), 'g');
  svg = svg.replace(regex, newColor);
}

fs.writeFileSync(logoPath, svg, 'utf8');
console.log('Logo updated successfully.');
