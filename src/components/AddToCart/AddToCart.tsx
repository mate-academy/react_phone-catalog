import { useContext, useEffect, useState } from 'react';

import './AddToCart.scss';
import { DispatchContext, StateContext } from '../../store/State';
import { MyButton } from '../UI/MyButton';
import { CartItemType } from '../../types/cart';

type Props = {
  product: CartItemType;
};

export const AddToCart: React.FC<Props> = ({ product }) => {
  const {
    itemId,
  } = product;

  const [favorite, setFavorite] = useState(false);
  const { favoriteProducts, cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isAdded = cart.some(el => el.itemId === itemId);

  function handleSetFavorite() {
    if (!favorite) {
      dispatch({ type: 'addFavorite', payload: itemId });
    } else {
      dispatch({ type: 'removeFavorite', payload: itemId });
    }
  }

  function handleAddToCart() {
    if (isAdded) {
      const updatedCart = cart.filter(el => el.itemId !== itemId);

      dispatch({ type: 'updateCart', payload: updatedCart });

      return;
    }

    dispatch({ type: 'updateCart', payload: [...cart, product] });
  }

  useEffect(() => {
    setFavorite(favoriteProducts.includes(itemId));
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [itemId, favoriteProducts, cart]);

  return (
    <div className="add-to-cart__btnbox">
      <MyButton
        handleClick={() => handleAddToCart()}
      >
        {isAdded ? 'Added to cart' : 'Add to cart'}
      </MyButton>

      <button
        type="button"
        data-cy="addToFavorite"
        className="add-to-cart__favorite"
        onClick={handleSetFavorite}
      >
        {favorite
          ? <img src="img/icons/heart-red.svg" alt="favorite product" />
          : <img src="img/icons/heart.svg" alt="favorite product" />}
      </button>
    </div>
  );
};
