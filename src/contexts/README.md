# React Context Providers

Цей проєкт використовує React Context API для управління глобальним станом кошика та улюблених товарів. Дані **автоматично зберігаються в localStorage** за допомогою кастомного хука `useLocalStorage`.

## Структура

```
src/
  contexts/
    CartContext.tsx         # Контекст для управління кошиком
    FavoritesContext.tsx    # Контекст для управління улюбленими
    index.ts                # Експорти контекстів
  hooks/
    useLocalStorage.ts      # Хук для синхронізації з localStorage
```

## Збереження даних

### localStorage Keys
- **`cart`** - зберігає масив товарів у кошику з кількістю
- **`favorites`** - зберігає масив улюблених товарів

### Автоматична синхронізація
Всі зміни в кошику та улюблених автоматично зберігаються в localStorage і відновлюються при перезавантаженні сторінки.

## CartContext

### Використання

```tsx
import { useCart } from './contexts';

function MyComponent() {
  const { 
    items,           // CartItem[] - всі товари в кошику
    addToCart,       // (product: Product) => void
    removeFromCart,  // (productId: number) => void
    updateQuantity,  // (productId: number, quantity: number) => void
    clearCart,       // () => void
    getTotalPrice,   // () => number
    getTotalCount,   // () => number
    isInCart,        // (productId: number) => boolean
    getQuantity      // (productId: number) => number
  } = useCart();

  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}
```

### CartItem Type

```typescript
type CartItem = {
  product: Product;
  quantity: number;
};
```

### Методи

- **`addToCart(product)`** - Додає товар в кошик (або збільшує кількість якщо вже є)
- **`removeFromCart(productId)`** - Видаляє товар з кошика
- **`updateQuantity(productId, quantity)`** - Оновлює кількість товару (якщо 0 - видаляє)
- **`clearCart()`** - Очищає весь кошик
- **`getTotalPrice()`** - Повертає загальну вартість всіх товарів
- **`getTotalCount()`** - Повертає загальну кількість товарів
- **`isInCart(productId)`** - Перевіряє чи товар в кошику
- **`getQuantity(productId)`** - Повертає кількість конкретного товару

## FavoritesContext

### Використання

```tsx
import { useFavorites } from './contexts';

function MyComponent() {
  const { 
    favorites,          // Product[] - всі улюблені товари
    addToFavorites,     // (product: Product) => void
    removeFromFavorites,// (productId: number) => void
    toggleFavorite,     // (product: Product) => void
    isFavorite,         // (productId: number) => boolean
    clearFavorites,     // () => void
    getFavoritesCount   // () => number
  } = useFavorites();

  return (
    <button onClick={() => toggleFavorite(product)}>
      {isFavorite(product.id) ? '❤️' : '🤍'}
    </button>
  );
}
```

### Методи

- **`addToFavorites(product)`** - Додає товар в улюблені
- **`removeFromFavorites(productId)`** - Видаляє товар з улюблених
- **`toggleFavorite(product)`** - Перемикає стан улюбленого товару
- **`isFavorite(productId)`** - Перевіряє чи товар в улюблених
- **`clearFavorites()`** - Очищає всі улюблені
- **`getFavoritesCount()`** - Повертає кількість улюблених товарів

## Підключення в App

```tsx
import { CartProvider, FavoritesProvider } from './contexts';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <YourApp />
      </FavoritesProvider>
    </CartProvider>
  );
}
```

## Приклади використання

### ProductCard з контекстами

```tsx
import { useCart, useFavorites } from '../../../../contexts';

export const ProductCard = ({ product }: Props) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <article>
      <Button 
        selected={isInCart(product.id)}
        onClick={() => addToCart(product)}
      >
        {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
      </Button>
      
      <Button 
        red={isFavorite(product.id)}
        onClick={() => toggleFavorite(product)}
      >
        {isFavorite(product.id) ? '❤️' : '🤍'}
      </Button>
    </article>
  );
};
```

### Header з іконками

```tsx
import { CartIcon, FavoritesIcon } from './modules/shared';

export const Header = () => {
  return (
    <header>
      <nav>
        <FavoritesIcon /> {/* Показує кількість улюблених */}
        <CartIcon />      {/* Показує кількість товарів в кошику */}
      </nav>
    </header>
  );
};
```

### Cart Page

```tsx
import { useCart } from '../contexts';

export const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  return (
    <div>
      <h1>Shopping Cart</h1>
      {items.map(({ product, quantity }) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => updateQuantity(product.id, +e.target.value)}
          />
          <button onClick={() => removeFromCart(product.id)}>
            Remove
          </button>
        </div>
      ))}
      <h2>Total: ${getTotalPrice()}</h2>
    </div>
  );
};
```

## Оптимізація

- ✅ Використовується `useMemo` для мемоїзації context value
- ✅ Функції не змінюються між рендерами
- ✅ Тільки необхідні компоненти перерендеряться при зміні стану
- ✅ **Автоматичне збереження в localStorage**
- ✅ **Відновлення стану при перезавантаженні сторінки**

## Технічні деталі localStorage

### useLocalStorage Hook
```typescript
// Автоматично синхронізує стан з localStorage
const [value, setValue] = useLocalStorage<T>('key', defaultValue);
```

**Переваги:**
- Автоматична серіалізація/десеріалізація JSON
- Обробка помилок (невалідний JSON)
- Type-safe з TypeScript
- Ініціалізація значенням за замовчуванням

### Формат даних в localStorage

**Cart:**
```json
[
  {
    "product": {
      "id": 1,
      "name": "iPhone 14",
      "price": 999,
      // ... інші поля Product
    },
    "quantity": 2
  }
]
```

**Favorites:**
```json
[
  {
    "id": 1,
    "name": "iPhone 14",
    // ... інші поля Product
  }
]
```

## Майбутні покращення

- ✅ ~~Додати localStorage для збереження кошика~~
- ✅ ~~Додати localStorage для улюблених~~
- 🔄 Реалізувати undo/redo функціонал
- 🔄 Додати анімації для додавання/видалення
- 🔄 Синхронізація між табами браузера (storage events)
- 🔄 Експорт/імпорт кошика
