import fs from 'fs';

const file = 'public/api/phones-lang.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

// Мапа замін для типових фраз
const replacements = [
  {
    find: /Трансформаційна система з трьох камер/gi,
    replace: 'Інноваційна система з трьох камер'
  },
  {
    find: /Безпрецедентний прорив у часі автономної роботи/gi,
    replace: 'Безпрецедентний прорив в автономності'
  },
  {
    find: /неймовірний чип, який вдвічі підвищує потужність машинного навчання та розширює межі можливостей смартфона/gi,
    replace: 'Вражаючий чип, що вдвічі потужніший для машинного навчання та розширює межі можливостей смартфона'
  },
  {
    find: /Познайомтесь із першою системою з трьох камер/gi,
    replace: 'Зустрічайте першу систему з трьох камер'
  },
  {
    find: /Знімай\. Переверни\. Зумуй\. Обріж\. Виріж\. Освітли\. Підлаштуй\. Закохайся\./gi,
    replace: 'Знімай. Переглядай. Збільшуй. Обрізай. Редагуй. Освітлюй. Налаштовуй. Насолоджуйся.'
  },
  {
    find: /Епічна обчислювальна потужність/gi,
    replace: 'Вражаюча обчислювальна потужність'
  },
  {
    find: /Ви ще ніколи не знімали нічого подібного/gi,
    replace: 'Ви ще ніколи не знімали так легко'
  },
  {
    find: /Завдяки чипу, який вдвічі підвищує потужність машинного навчання/gi,
    replace: 'Завдяки чипу, що вдвічі потужніший для машинного навчання'
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
console.log('Масова заміна англіцизмів і кальки у phones-lang.json виконана!');
