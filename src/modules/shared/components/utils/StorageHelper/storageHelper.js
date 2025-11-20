// storageHelpers.js

const CART_KEY = 'shop_cart';
const FAV_KEY = 'shop_favorites';

// --- КОРЗИНА ---

export const getCart = () => {
  const data = localStorage.getItem(CART_KEY);

  return data ? JSON.parse(data) : [];
};

export const addToCart = product => {
  const cart = getCart();
  // Перевіряємо, чи товар вже є в корзині
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    // Якщо є - збільшуємо кількість
    existingItem.quantity += 1;
  } else {
    // Якщо немає - додаємо новий об'єкт
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  return cart; // Повертаємо оновлений стан
};

export const removeFromCart = productId => {
  const cart = getCart().filter(item => item.id !== productId);

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  return cart;
};

// --- УЛЮБЛЕНЕ (Зберігаємо тільки ID) ---

export const getFavorites = () => {
  const data = localStorage.getItem(FAV_KEY);

  return data ? JSON.parse(data) : [];
};

export const toggleFavorite = productId => {
  let favorites = getFavorites();

  if (favorites.includes(productId)) {
    // Якщо вже є - видаляємо
    favorites = favorites.filter(id => id !== productId);
  } else {
    // Якщо немає - додаємо
    favorites.push(productId);
  }

  localStorage.setItem(FAV_KEY, JSON.stringify(favorites));

  return favorites;
};
