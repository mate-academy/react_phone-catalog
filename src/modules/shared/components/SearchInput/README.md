# SearchInput Component

Компонент пошуку з дебаунсом та синхронізацією з URL.

## Функціональність

- **Дебаунс** - затримка 500ms перед викликом onSearch
- **Синхронізація з URL** - зберігає query параметр в URL (`?query=value`)
- **Відновлення з URL** - ініціалізується значенням з URL при завантаженні
- **Кнопка очищення** - з'являється коли є текст
- **Іконки** - search (коли пусто) та close (коли є текст)

## Props

```typescript
type Props = {
  onSearch: (query: string) => void; // Callback з пошуковим запитом
  placeholder?: string; // Placeholder для input
};
```

## Використання

```tsx
import { SearchInput } from '../shared';

const [searchQuery, setSearchQuery] = useState('');

<SearchInput onSearch={setSearchQuery} placeholder="Search in phones..." />;
```

## Стилізація

- Адаптивний width (max 300px)
- Rounded corners (8px)
- Hover та focus стани
- Transitions для плавності

## Дебаунс

Затримка 500ms дозволяє уникнути зайвих викликів API під час швидкого друку.

## URL Параметри

- При введенні тексту: `?query=iphone`
- При очищенні: параметр видаляється з URL
- `replace: true` - не створює нові записи в історії браузера
