import React, { useContext } from 'react';
import buttons from './Buttons.module.scss';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';
import { ProductPreview } from '../../types/ProductPreview';

type Props = {
  product: ProductPreview;
};

export const Buttons: React.FC<Props> = ({ product }) => {
  const { favoritesIds, addFavoriteId } = useContext(FavoritesContext);
  const { cartItems, addToCart } = useContext(CartContext);

  const productId = product.id.toString();

  return (
    <div className={buttons.buttons}>
      <button
        className={`${buttons['buttons__add-to-cart']} ${cartItems.find(item => item.id === productId) ? buttons['buttons__add-to-cart--active'] : ''}`}
        onClick={() => addToCart(product)}
      >
        {cartItems.find(item => item.id === productId)
          ? 'Added to cart'
          : 'Add to cart'}
      </button>
      <button
        className={`${buttons['buttons__to-favourites']} ${favoritesIds.includes(productId) ? buttons['buttons__to-favourites--active'] : ''}`}
        onClick={() => addFavoriteId(productId)}
      />
    </div>
  );
};
