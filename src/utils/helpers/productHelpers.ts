type ItemWithId = { id: string };
type ItemWithQty = { id: string; qty: number };

export const addToCart = <T extends ItemWithQty>(
  cart: T[],
  itemCard: T,
): T[] => {
  const isItemInCart = cart.find(item => item.id === itemCard.id);

  if (isItemInCart) {
    return cart.map(item =>
      item.id === itemCard.id ? { ...item, qty: item.qty + 1 } : item,
    );
  }

  return [...cart, { ...itemCard, qty: 1 }];
};

export const addToFavourites = <T extends ItemWithId>(
  favourite: T[],
  itemCard: T,
): T[] => {
  const newFav = favourite.some(item => item.id === itemCard.id)
    ? favourite.filter(i => i.id !== itemCard.id)
    : [...favourite, itemCard];

  return newFav;
};
