import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { FavouritesContext } from '../context/FavouritesContext';
import { useLocalStorageState } from '../helpers/localSrorage';
import { Product } from '../type/Product';

export function useProductActions(product: Product) {
  const { toggleCartItem, cartItems } = useContext(CartContext);
  const { toggleFavourite, favouritesItems } = useContext(FavouritesContext);

  const [isFavourite, setIsFavourite] = useLocalStorageState(
    'isFavourite',
    false,
  );
  const isInCart = cartItems.some((item) => item.id === +product.id);

  useEffect(() => {
    setIsFavourite(favouritesItems
      .some((item) => item.product.id === product.id));
  }, [favouritesItems, product]);

  const handleAddToFavourites = () => {
    toggleFavourite(product);
    setIsFavourite((prev: boolean) => !prev);
  };

  const handleAddToCart = () => {
    toggleCartItem({
      id: +product.id,
      quantity: 1,
      product,
      price: product.price,
    });
  };

  return {
    isInCart, isFavourite, handleAddToFavourites, handleAddToCart,
  };
}
