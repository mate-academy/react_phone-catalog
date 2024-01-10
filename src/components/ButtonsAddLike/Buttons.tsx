import React, { useContext } from 'react';
import './Buttons.scss';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { StorContext } from '../../context/StorContext';

type Props = {
  product: Product;
  isSelectedFav: boolean;
  isSelectedInCart: boolean;
};

export const Buttons: React.FC<Props> = ({
  product,
  isSelectedFav,
  isSelectedInCart,
}) => {
  const { handleAddOrDeleteCart, handleLike } = useContext(StorContext);
  const addToCart = () => handleAddOrDeleteCart(product);
  const like = () => handleLike(product);

  return (
    <div className="buttons">
      <button
        className={classNames('buttons__buy', {
          'buttons__buy--active': isSelectedInCart,
        })}
        type="button"
        onClick={addToCart}
      >
        {`${isSelectedInCart ? 'Added to cart' : 'Add to cart'}`}
      </button>

      <button
        aria-label="button"
        className="buttons__fav"
        type="button"
        onClick={like}
      >
        {!isSelectedFav ? (
          <img
            src="img/mine/icons/Favourites (Heart Like).svg"
            alt=""
            className="buttons__fav-img"
          />
        ) : (
          <img
            src="img\mine\icons\Favourites Filled (Heart Like).svg"
            alt=""
            className="buttons__fav-img"
          />
        )}
      </button>
    </div>
  );
};
