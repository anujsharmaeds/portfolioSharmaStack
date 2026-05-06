import fs from 'fs';

let content = fs.readFileSync('src/i18n/index.ts', 'utf8');

content = content.replace(/"nav\.home":\s*"Home",/, '"common.comingSoon": "Coming Soon!",\n      "nav.home": "Home",');
content = content.replace(/"nav\.home":\s*"Startseite",/, '"common.comingSoon": "Demnächst!",\n      "nav.home": "Startseite",');
content = content.replace(/"nav\.home":\s*"Accueil",/, '"common.comingSoon": "Bientôt disponible !",\n      "nav.home": "Accueil",');
content = content.replace(/"nav\.home":\s*"홈",/, '"common.comingSoon": "곧 제공 예정!",\n      "nav.home": "홈",');

fs.writeFileSync('src/i18n/index.ts', content, 'utf8');
console.log('Updated i18n');
