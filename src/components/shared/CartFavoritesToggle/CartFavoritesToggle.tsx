import { useCart } from '../../../context/CartContext';
import { useFavorite } from '../../../context/FavoriteContext';
import { Product } from '../../../types/Product';
import './CartFavoritesToggle.scss';
import React from 'react';

type Props = { product: Product };

export const CartFavoritesToggle: React.FC<Props> = ({ product }) => {
  const { cartItems, setCartItems } = useCart();
  const { favoriteItems, setFavoriteItems } = useFavorite();

  const inBasket = cartItems.some(
    item => item.product.itemId === product.itemId,
  );
  const inFavorite = favoriteItems.some(item => item.itemId === product.itemId);

  function addToBasket() {
    if (inBasket) {
      setCartItems(
        cartItems.filter(elem => elem.product.itemId !== product.itemId),
      );
    } else {
      setCartItems([...cartItems, { amount: 1, product }]);
    }
  }

  function addToFavorite() {
    if (favoriteItems.some((item: Product) => item.id === product.id)) {
      setFavoriteItems(
        favoriteItems.filter(elem => elem.itemId !== product.itemId),
      );
    } else {
      setFavoriteItems([...favoriteItems, product]);
    }
  }

  return (
    <>
      <div className="buttons">
        <button
          className={`button button--add${inBasket ? '-clicked' : ''}`}
          onClick={addToBasket}
        >
          {!inBasket ? 'Add to cart' : 'Added to cart'}
        </button>
        <button
          onClick={addToFavorite}
          className={`button button--favorite${inFavorite ? '-clicked' : ''}`}
          aria-label="Add to favorite"
        ></button>
      </div>
    </>
  );
};
