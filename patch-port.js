import fs from 'fs';
const path = './dist/server/entry.mjs';

let content = fs.readFileSync(path, 'utf-8');
content = content.replace(
  /"port":\s*\d+/,
  `"port": parseInt(process.env.PORT) || 4321`
);
fs.writeFileSync(path, content);
console.log('✅ entry.mjs patched to use process.env.PORT');
