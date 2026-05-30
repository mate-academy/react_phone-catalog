export const getFavouriteProducts = () => {
  return JSON.parse(localStorage.getItem('favouriteProducts') || '[]');
};

export const saveFavouriteProducts = (ids: string[]) => {
  localStorage.setItem('favouriteProducts', JSON.stringify(ids));
};

export const getCartProducts = () => {
  return JSON.parse(localStorage.getItem('cart') || '{}');
};

export const saveCartProducts = (cart: Record<string, number>) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getTheme = () => {
  return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
};

export const saveTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', theme);
};

export const getLanguage = () => {
  return (localStorage.getItem('language') as 'en' | 'uk') || 'en';
};

export const saveLanguage = (language: 'en' | 'uk') => {
  localStorage.setItem('language', language);
};
