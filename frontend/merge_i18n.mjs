import fs from 'fs';

const oldContent = fs.readFileSync('src/i18n/index.old.ts', 'utf16le');
const newContent = fs.readFileSync('src/i18n/index.ts', 'utf8');

function extractResources(content) {
  const match = content.match(/const resources = (\{[\s\S]*?\});\s*i18n/);
  return match ? match[1] : null;
}

const oldResStr = extractResources(oldContent);
const newResStr = extractResources(newContent);

const oldResources = new Function('return ' + oldResStr)();
const newResources = new Function('return ' + newResStr)();

const mergedResources = {
  en: newResources.en,
  de: { translation: { ...newResources.en.translation, ...(oldResources?.de?.translation || {}) } },
  fr: { translation: { ...newResources.en.translation, ...(oldResources?.fr?.translation || {}) } },
  ko: { translation: { ...newResources.en.translation, ...(oldResources?.ko?.translation || {}) } }
};

const newResStrStringified = JSON.stringify(mergedResources, null, 2);

const finalContent = newContent.replace(newResStr, newResStrStringified);

fs.writeFileSync('src/i18n/index.ts', finalContent, 'utf8');
console.log('Merged successfully!');
