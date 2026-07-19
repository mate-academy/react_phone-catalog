const fs = require('fs');
const path = require('path');

const distDirectory = path.resolve(__dirname, '../dist');
const indexFile = path.join(distDirectory, 'index.html');
const notFoundFile = path.join(distDirectory, '404.html');

fs.copyFileSync(indexFile, notFoundFile);

console.log('Created dist/404.html for GitHub Pages SPA routing.');
