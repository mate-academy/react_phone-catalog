import { useContext } from 'react';
import { AddAndFavoritesContext } from '../context/AddAndFavoritesContext';

import style from './FavoritesAddButton.module.scss';
import favorites from '../../../public/img/Icons/favoriteIcon.svg';
import PinkFavorites from '../../../public/img/Icons/PinkHeartLike.svg';

type Props = {
  productId: number;
};

export const FavoritesAddButton = ({ productId }: Props) => {
  const context = useContext(AddAndFavoritesContext);
  const { toggleFavorite, isFavorite, toggleCart, isInCart } = context;

  return (
    <div className={style.addFavoritesContainer}>
      {!isInCart(productId) ? (
        <button
          className={`${style.addButton} hasShadow`}
          onClick={() => toggleCart(productId)}
        >
          <p className={style.buttonText}>Add to cart</p>
        </button>
      ) : (
        <button
          className={`${style.addButton} hasShadow ${style.added}`}
          onClick={() => toggleCart(productId)}
        >
          <p className={style.buttonText}>Added</p>
        </button>
      )}

      <button
        className={`${style.favoritesButton} hasShadow`}
        onClick={() => toggleFavorite(productId)}
      >
        {!isFavorite(productId) ? (
          <img className="icon" src={favorites} alt="favorites img" />
        ) : (
          <img className="icon" src={PinkFavorites} alt="favorites img" />
        )}
      </button>
    </div>
  );
};
