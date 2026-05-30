import useLocalStorage from './useLocalStorage';

export const useProducts = () => {
  const [favourites, setFavourites] = useLocalStorage('favourites', []);
  const [shoppingBag, setShoppingBag] = useLocalStorage('shoppingBag', []);

  const addToFavourites = product => {
    const updatedFavourites = [...favourites, product];

    setFavourites(updatedFavourites);

    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const removeFromFavourites = productId => {
    const updatedFavourites = favourites.filter(item => item.id !== productId);

    setFavourites(updatedFavourites);

    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const addToShoppingBag = product => {
    const newProduct = {
      ...product,
      count: 1,
    };
    const updatedShoppingBag = [...shoppingBag, newProduct];

    setShoppingBag(updatedShoppingBag);

    localStorage.setItem('shoppingBag', JSON.stringify(updatedShoppingBag));
  };

  const removeFromShoppingBag = productId => {
    const updatedShoppingBag = shoppingBag.filter(
      item => item.id !== productId,
    );

    setShoppingBag(updatedShoppingBag);
    localStorage.setItem('shoppingBag', JSON.stringify(updatedShoppingBag));
  };

  return {
    favourites,
    addToFavourites,
    removeFromFavourites,
    shoppingBag,
    setShoppingBag,
    addToShoppingBag,
    removeFromShoppingBag,
  };
};
