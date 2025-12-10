import classNames from 'classnames';
import { useState } from 'react';
import vaforiteImg from './../../images/icons/Favourites (Heart Like).svg';
import vaforiteImgSelected from './../../images/icons/Favourites (Heart Like)_2.svg';
import { useCartFavorite } from '../../context/CartFavoriteContext';

export const ProductCardButtons = () => {
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [isAddToFavorite, setIsAddToFavorite] = useState<boolean>(false);


  return (
    <div className="card__buttons">
      <button
        onClick={() => setIsAddToCart(prev => !prev)}
        className={classNames('card__add', {
          card__add_selected: isAddToCart,
        })}
      >
        {isAddToCart ? 'Added' : 'Add to cart'}
      </button>
      <button
        className="card__favorite card__favorite_selected"
        onClick={() => setIsAddToFavorite(prev => !prev)}
      >
        {isAddToFavorite ? (
          <img src={vaforiteImgSelected} alt="" />
        ) : (
          <img src={vaforiteImg} alt="" />
        )}
      </button>
    </div>
  );
};
