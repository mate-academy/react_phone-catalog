import style from './ButtonsAddCardFav.module.scss';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../GlobalProvider';
import { FavoriteIcon } from './FavoriteIcon';

type Props = {
  productId: string;
};

export const ButtonsAddCardFav: React.FC<Props> = ({ productId }) => {
  const { productsInCart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const prodInCart = !!productsInCart.find(prod => prod.itemId === productId);

  return (
    <div className={classNames(style.container)}>
      <div
        className={classNames(style.addToCart_container, {
          [style.addToCart_container_inCart]: prodInCart,
        })}
        onClick={() =>
          dispatch({ type: 'setCartProducts', payload: productId })
        }
      >
        <div
          className={classNames(style.addToCart_text, {
            [style.addToCart_text_inCart]: prodInCart,
          })}
        >
          Add to cart
        </div>
      </div>

      <div className={classNames(style.favorite_container)}>
        <FavoriteIcon curProductId={productId} />
      </div>
    </div>
  );
};
