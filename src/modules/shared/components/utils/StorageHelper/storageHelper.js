const CART_KEY = 'shop_cart';
const FAV_KEY = 'shop_favorites';

export const getCart = () => {
  const data = localStorage.getItem(CART_KEY);

  return data ? JSON.parse(data) : [];
};

export const addToCart = product => {
  const cart = getCart();

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  return cart;
};

export const removeFromCart = productId => {
  const cart = getCart().filter(item => item.id !== productId);

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  return cart;
};

export const getFavorites = () => {
  const data = localStorage.getItem(FAV_KEY);

  return data ? JSON.parse(data) : [];
};

export const toggleFavorite = productId => {
  let favorites = getFavorites();

  if (favorites.includes(productId)) {
    favorites = favorites.filter(id => id !== productId);
  } else {
    favorites.push(productId);
  }

  localStorage.setItem(FAV_KEY, JSON.stringify(favorites));

  return favorites;
};
