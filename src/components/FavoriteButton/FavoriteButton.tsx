/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import styles from './FavoriteButton.module.scss';
import '../../styles/App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  addToFavourites,
  removeFromFavourites,
} from '../../store/slices/favouritesSlice';
import { Product } from '../../types/products';

type FavoriteButtonProps = {
  productId: string;
  product: Product;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  productId,
  product,
}) => {
  const { favourites } = useSelector((state: RootState) => state.favourites);
  const dispatch = useDispatch();

  const isFavourite: boolean = useMemo(() => {
    return favourites.some(item => item.itemId === productId);
  }, [favourites, productId]);

  function handleFavourites() {
    if (isFavourite) {
      dispatch(removeFromFavourites(productId));
    } else {
      dispatch(addToFavourites(product));
    }
  }

  return (
    <button
      className={classNames(styles['favorite-button'])}
      onClick={handleFavourites}
    >
      {isFavourite ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.3 1.29877C10.7264 1.29877 10.1584 1.41178 9.62852 1.63136C9.09865 1.85091 8.61711 2.17281 8.21162 2.57846L8.00005 2.79003L7.78835 2.57834C6.96928 1.75927 5.85839 1.29912 4.70005 1.29912C3.54171 1.29912 2.43081 1.75927 1.61174 2.57834C0.792668 3.39741 0.33252 4.50831 0.33252 5.66665C0.33252 6.82499 0.792668 7.93589 1.61174 8.75496L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75496C14.794 8.34947 15.1158 7.86805 15.3353 7.33817C15.5549 6.80825 15.6679 6.24026 15.6679 5.66665C15.6679 5.09304 15.5549 4.52505 15.3353 3.99513C15.1158 3.46531 14.7941 2.98392 14.3885 2.57846C13.983 2.17276 13.5015 1.85093 12.9716 1.63136C12.4416 1.41178 11.8737 1.29877 11.3 1.29877Z"
            fill="#F447AF"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles['favorite-button__icon']}`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M9.62852 1.63137C10.1584 1.41179 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.41179 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98393 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66666C15.6679 6.24027 15.5549 6.80826 15.3353 7.33819C15.1158 7.86806 14.794 8.34948 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.825 0.33252 5.66666C0.33252 4.50832 0.792668 3.39742 1.61174 2.57835C2.43081 1.75928 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75928 7.78835 2.57835L8.00005 2.79005L8.21162 2.57847C8.21158 2.57851 8.21166 2.57843 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07391 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07391 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.5683C6.24189 3.01178 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01178 2.60169 3.5683C2.04517 4.12482 1.73252 4.87962 1.73252 5.66666C1.73252 6.4537 2.04517 7.2085 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48952 13.8928 7.1623 14.042 6.80228C14.1911 6.44225 14.2679 6.05637 14.2679 5.66666C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17102 13.6739 3.84369 13.3983 3.56819Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;
