import fs from 'fs';

const file = 'public/api/accessories-lang.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

// Мапа замін для типових фраз аксесуарів
const replacements = [
  {
    find: /Залишайтеся на зв'язку на ходу/gi,
    replace: "Залишайтеся на зв'язку"
  },
  {
    find: /Завдяки цьому аксесуару ви завжди будете на зв'язку, де б ви не були\./gi,
    replace: "Цей аксесуар допоможе вам залишатися на зв'язку у будь-якій ситуації."
  },
  {
    find: /Висока продуктивність та ефективність/gi,
    replace: 'Висока ефективність у використанні'
  },
  {
    find: /Завдяки сучасним технологіям аксесуар забезпечує стабільну роботу та довговічність/gi,
    replace: 'Сучасні технології гарантують стабільну роботу та довговічність аксесуара'
  },
  {
    find: /Легкий та портативний дизайн/gi,
    replace: 'Легкий і зручний дизайн'
  },
  {
    find: /Компактний розмір дозволяє брати аксесуар із собою всюди, де б ви не були/gi,
    replace: 'Компактний розмір дозволяє брати аксесуар із собою будь-куди'
  },
  {
    find: /Сумісність із різними пристроями/gi,
    replace: 'Сумісний з різними пристроями'
  },
  {
    find: /Аксесуар підходить для широкого спектра пристроїв, що робить його універсальним вибором/gi,
    replace: 'Аксесуар підходить для багатьох пристроїв, що робить його універсальним вибором'
  }
];

for (const item of data) {
  if (!item.description || !item.description.uk) continue;
  for (const block of item.description.uk) {
    if (block.text && Array.isArray(block.text)) {
      block.text = block.text.map(text => {
        let newText = text;
        for (const {find, replace} of replacements) {
          newText = newText.replace(find, replace);
        }
        return newText;
      });
    }
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
console.log('Масова заміна англіцизмів і кальки у accessories-lang.json виконана!');
