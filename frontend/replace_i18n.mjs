import fs from 'fs';

let content = fs.readFileSync('src/i18n/index.ts', 'utf8');

content = content.replace(/Senior Full Stack Developer/g, 'sharmaStack');
content = content.replace(/Senior Full Stack Entwickler/g, 'sharmaStack');
content = content.replace(/Développeur Full Stack Senior/g, 'sharmaStack');

fs.writeFileSync('src/i18n/index.ts', content, 'utf8');
console.log('Replaced Full Stack Developer with sharmaStack in i18n/index.ts');
