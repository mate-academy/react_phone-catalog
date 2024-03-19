/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import cn from 'classnames';

import { GlobalContext } from '../GlobalContext';
import { Product } from '../types/Product';
import { checkIsInList } from '../helpers/checkIsInList';

import '../styles/ButtonsCartFav.scss';

interface Props {
  product: Product;
  height?: number;
}

export const ButtonsCartFav: React.FC<Props> = ({ product, height }) => {
  const { cartList, favList, addRemoveFavList, addRemoveCartList } =
    useContext(GlobalContext);

  const cart = {
    id: product.id,
    quantity: 1,
    product,
  };

  const style = {
    gridTemplateColumns: `1fr ${height}px`,
    gridTemplateRows: `${height}px`,
  };

  return (
    <div className="buttons-cart-fav" style={style}>
      <button
        type="button"
        className={cn('buttons-cart-fav__cart', {
          'buttons-cart-fav__cart--active': checkIsInList(product.id, cartList),
        })}
        onClick={() => addRemoveCartList(cart)}
      >
        {checkIsInList(product.id, cartList) ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        data-cy="addToFavorite"
        className={cn('buttons-cart-fav__favorites', {
          'buttons-cart-fav__favorites--active': checkIsInList(
            product.id,
            favList,
          ),
        })}
        onClick={() => addRemoveFavList(product)}
      />
    </div>
  );
};
