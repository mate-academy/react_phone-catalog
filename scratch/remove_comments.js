const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.scss') || file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('c:\\Users\\anton\\Documents\\projects\\react_phone-catalog\\src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. JSX comments: {/* ... */}
  content = content.replace(/\{\/\*([\s\S]*?)\*\/\}/g, (match, p1) => {
    if (p1.includes('eslint-disable') || p1.includes('stylelint')) {
      return match;
    }
    return '';
  });

  // 2. Block comments: /* ... */
  content = content.replace(/\/\*([\s\S]*?)\*\//g, (match, p1) => {
    if (p1.includes('eslint-disable') || p1.includes('stylelint')) {
      return match;
    }
    return '';
  });

  // 3. Line comments: // ... (not preceded by :)
  content = content.replace(/(?<!:)\/\/.*$/gm, (match) => {
    if (match.includes('eslint-disable') || match.includes('stylelint') || match.includes('/// <reference')) {
      return match;
    }
    return '';
  });

  // Cleanup: remove completely empty lines that only contained whitespace (which were just comments)
  content = content.replace(/^[ \t]+$/gm, '');
  content = content.replace(/\n{3,}/g, '\n\n');

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Comments removed.');
