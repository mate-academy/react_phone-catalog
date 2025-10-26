# Dropdown Component

Компонент для вибору опції зі списку (select/dropdown).

## Особливості

✅ TypeScript типізація  
✅ BEM нотація CSS  
✅ Підтримка keyboard navigation (Escape для закриття)  
✅ Автоматичне закриття при кліку поза dropdown  
✅ Стан disabled  
✅ Кастомний placeholder  
✅ Візуальна індикація вибраного елемента  
✅ Адаптивний дизайн  
✅ Smooth scroll для довгих списків  
✅ Accessibility (ARIA attributes)  

## Використання

### Базовий приклад

```tsx
import { Dropdown } from './modules/shared';
import { useState } from 'react';

function MyComponent() {
  const [selectedValue, setSelectedValue] = useState<string | number>('');

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ];

  return (
    <Dropdown
      label="Choose a fruit"
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder="Select a fruit"
    />
  );
}
```

### Без label

```tsx
<Dropdown
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select a fruit"
/>
```

### З числовими значеннями

```tsx
const sortOptions = [
  { value: 1, label: 'Price: Low to High' },
  { value: 2, label: 'Price: High to Low' },
  { value: 3, label: 'Newest First' },
  { value: 4, label: 'Alphabetical' },
];

<Dropdown
  options={sortOptions}
  value={sortOrder}
  onChange={setSortOrder}
/>
```

### Disabled стан

```tsx
<Dropdown
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  disabled={true}
/>
```

### З кастомним className

```tsx
<Dropdown
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  className="my-custom-class"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `DropdownOption[]` | ✅ | - | Масив опцій для вибору |
| `value` | `string \| number` | ❌ | `undefined` | Поточне вибране значення |
| `onChange` | `(value: string \| number) => void` | ❌ | `undefined` | Callback при зміні значення |
| `placeholder` | `string` | ❌ | `'Select option'` | Текст, коли нічого не вибрано |
| `disabled` | `boolean` | ❌ | `false` | Вимкнути dropdown |
| `className` | `string` | ❌ | `undefined` | Додатковий CSS клас |
| `label` | `string` | ❌ | `undefined` | Надпис зверху dropdown |

### DropdownOption Type

```typescript
type DropdownOption = {
  value: string | number;
  label: string;
};
```

## Приклади використання в проєкті

### Сортування товарів

```tsx
import { Dropdown } from './modules/shared';

function ProductsPage() {
  const [sortBy, setSortBy] = useState('newest');

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'cheapest', label: 'Cheapest' },
    { value: 'expensive', label: 'Most Expensive' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ];

  return (
    <div>
      <Dropdown
        options={sortOptions}
        value={sortBy}
        onChange={(value) => setSortBy(value as string)}
        placeholder="Sort by"
      />
      {/* Products list */}
    </div>
  );
}
```

### Вибір кількості товарів на сторінці

```tsx
const itemsPerPageOptions = [
  { value: 12, label: '12 items' },
  { value: 24, label: '24 items' },
  { value: 48, label: '48 items' },
  { value: 96, label: '96 items' },
];

<Dropdown
  options={itemsPerPageOptions}
  value={itemsPerPage}
  onChange={setItemsPerPage}
/>
```

### Вибір категорії

```tsx
const categoryOptions = [
  { value: 'all', label: 'All categories' },
  { value: 'phones', label: 'Phones' },
  { value: 'tablets', label: 'Tablets' },
  { value: 'accessories', label: 'Accessories' },
];

<Dropdown
  options={categoryOptions}
  value={selectedCategory}
  onChange={setSelectedCategory}
  placeholder="Select category"
/>
```

## Стилізація

Компонент використовує BEM нотацію. Основні класи:

- `.dropdown` - основний контейнер
- `.dropdown--disabled` - disabled стан
- `.dropdown--open` - відкритий стан
- `.dropdown__button` - кнопка dropdown
- `.dropdown__button-text` - текст кнопки
- `.dropdown__arrow` - стрілка (▼)
- `.dropdown__arrow--up` - стрілка вгору (коли відкрито)
- `.dropdown__menu` - випадаюче меню
- `.dropdown__item` - елемент списку
- `.dropdown__item--selected` - вибраний елемент

### Кастомізація через CSS

```scss
.my-custom-dropdown {
  .dropdown__button {
    background-color: lightblue;
  }

  .dropdown__item--selected {
    background-color: yellow;
  }
}
```

## Доступність (Accessibility)

- ✅ `role="listbox"` на меню
- ✅ `role="option"` на елементах
- ✅ `aria-haspopup="listbox"` на кнопці
- ✅ `aria-expanded` для стану відкритості
- ✅ `aria-selected` для вибраних елементів
- ✅ Keyboard navigation (Escape для закриття)
- ✅ Proper focus management

## Поведінка

1. **Відкриття/Закриття:**
   - Клік по кнопці → відкриває/закриває
   - Клік поза dropdown → закриває
   - Натискання Escape → закриває

2. **Вибір опції:**
   - Клік по елементу → вибирає і закриває
   - Викликає `onChange` callback
   - Оновлює відображення на кнопці

3. **Disabled стан:**
   - Кнопка неактивна
   - Dropdown не відкривається
   - Візуальна індикація (opacity 0.5)

## Майбутні покращення

- 🔄 Keyboard navigation (Arrow keys)
- 🔄 Пошук по опціях (type to search)
- 🔄 Multi-select підтримка
- 🔄 Групування опцій
- 🔄 Іконки в опціях
- 🔄 Віртуалізація для великих списків
