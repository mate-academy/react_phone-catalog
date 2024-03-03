/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import '../styles/ButtonsCartFav.scss';
import { GlobalContext } from '../GlobalContext';
import { Product } from '../types/Product';

interface Props {
  product: Product,
  height?: number
}

export const ButtonsCartFav: React.FC<Props> = ({ product, height }) => {
  const { addRemoveFavList, addRemoveCartList } = useContext(GlobalContext);

  const cart = {
    quantity: 1,
    product,
  }

  const style = {
    gridTemplateColumns: `1fr ${height}px`,
    gridTemplateRows: `${height}px`,
  };

  // console.log(favList);
  // console.log(product);

  return (
    <div className="buttons-cart-fav" style={style}>
      <button
        type="button"
        className="buttons-cart-fav__cart"
        onClick={() => addRemoveCartList(cart)}
      >
        Add to cart
      </button>

      <button
        type="button"
        className="buttons-cart-fav__favorites"
        onClick={() => addRemoveFavList(product)}
      />
    </div>
  );
};
