/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import '../styles/ButtonsCartFav.scss';

interface Props {
  height?: number
}

export const ButtonsCartFav: React.FC<Props> = ({ height }) => {
  const style = {
    gridTemplateColumns: `1fr ${height}px`,
    gridTemplateRows: `${height}px`,
  };

  return (
    <div className="buttons-cart-fav" style={style}>
      <button
        type="button"
        className="buttons-cart-fav__cart"
      >
        Add to cart
      </button>

      <button
        type="button"
        className="buttons-cart-fav__favourites"
      />
    </div>
  );
};
