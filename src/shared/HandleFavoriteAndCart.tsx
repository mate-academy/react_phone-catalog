import { Product } from '../types/Product';

export const handleAddToCart = () => {
  const storedCart: CartItem[] = JSON.parse(
    localStorage.getItem('CartStore') || '[]',
  );

  const isAlreadyInCart = storedCart.some(
    cartItem => cartItem.item.id === currentProduct.id,
  );

  let updatedCart;

  if (isAlreadyInCart) {
    updatedCart = storedCart.filter(item => item.item.id !== currentProduct.id);
  } else {
    updatedCart = [...storedCart, { item: currentProduct, quantity: 1 }];
  }

  setCartState(updatedCart);
  localStorage.setItem('CartStore', JSON.stringify(updatedCart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const handleAddToFavorite = () => {
  const storedFavorite: Product[] = JSON.parse(
    localStorage.getItem('FavoriteStore') || '[]',
  );

  const isAlreadyInFavorite = storedFavorite.some(
    item => item.id === currentProduct.id,
  );

  let updatedFavorite: Product[];

  if (isAlreadyInFavorite) {
    updatedFavorite = storedFavorite.filter(
      item => item.id !== currentProduct.id,
    );
  } else {
    updatedFavorite = [...storedFavorite, currentProduct];
  }

  setFavoriteState(updatedFavorite);
  localStorage.setItem('FavoriteStore', JSON.stringify(updatedFavorite));
  window.dispatchEvent(new Event('favUpdated'));
};
