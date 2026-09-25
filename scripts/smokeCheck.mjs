import fs from 'node:fs';
const required=['index.html','package.json','src/main.jsx','src/data/questions.json','src/pages/Practice.jsx','src/pages/PYQ.jsx','src/pages/MockTest.jsx','src/pages/Analytics.jsx','src/pages/Review.jsx','src/pages/Revision.jsx','public/manifest.webmanifest','public/sw.js'];
const missing=required.filter(f=>!fs.existsSync(f));
if(missing.length){console.error('Missing files:',missing.join(', '));process.exit(1)}
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
for(const script of ['dev','build','validate:questions']) if(!pkg.scripts?.[script]){console.error('Missing script:',script);process.exit(1)}
console.log('Smoke check passed:',required.length,'required files and core scripts present.');
