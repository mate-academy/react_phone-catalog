import style from './ButtonsAddCardFav.module.scss';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../GlobalProvider';
import { FavoriteIcon } from './FavoriteIcon';
import { Product } from '../../types/Product';

type Props = {
  productId: string;
};

export const ButtonsAddCardFav: React.FC<Props> = ({ productId }) => {
  const { inCart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const prodInCart = inCart
    ? !!inCart.find((prod: Product) => prod.itemId === productId)
    : false;

  return (
    <div className={classNames(style.container)}>
      <div
        className={classNames(style.container_addToCart, 'buttons_container', {
          buttons_container_selected: prodInCart,
        })}
        onClick={() => {
          dispatch({ type: 'toggleInCart', payload: productId });
        }}
      >
        <div
          className={classNames('buttons_text', {
            buttons_text_selected: prodInCart,
          })}
        >
          {!prodInCart ? 'Add to cart' : 'Added to cart'}
        </div>
      </div>

      <div className={classNames(style.container_favorite)}>
        <FavoriteIcon curProductId={productId} />
      </div>
    </div>
  );
};
