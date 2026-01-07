import React from 'react';
import { Product } from '../../types/Product';
import useCartStore from '../../stores/useCartStore';
import useFavoritesStore from '../../stores/useFavoritesStore';
import useLanguageStore from '../../stores/useLanguageStore';
import classNames from 'classnames';
import styles from './ProductActions.module.scss';

type Props = {
  product: Product;
};

export const ProductActions: React.FC<Props> = ({ product }) => {
  const { t } = useLanguageStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { addToCart, isAddedToCart } = useCartStore();
  // Шлях для заповненого серця
  const PATH_FILLED =
    // eslint-disable-next-line max-len
    'M11.3 1.29877C10.7264 1.29877 10.1584 1.41178 9.62852 1.63136C9.09865 1.85091 8.61711 2.17281 8.21162 2.57846L8.00005 2.79003L7.78835 2.57834C6.96928 1.75927 5.85839 1.29912 4.70005 1.29912C3.54171 1.29912 2.43081 1.75927 1.61174 2.57834C0.792668 3.39741 0.33252 4.50831 0.33252 5.66665C0.33252 6.82499 0.792668 7.93589 1.61174 8.75496L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75496C14.794 8.34947 15.1158 7.86805 15.3353 7.33817C15.5549 6.80825 15.6679 6.24026 15.6679 5.66665C15.6679 5.09304 15.5549 4.52505 15.3353 3.99513C15.1158 3.46531 14.7941 2.98392 14.3885 2.57846C13.983 2.17276 13.5015 1.85093 12.9716 1.63136C12.4416 1.41178 11.8737 1.29877 11.3 1.29877Z';

  // Шлях для порожнього серця
  const PATH_EMPTY =
    // eslint-disable-next-line max-len
    'M9.62848 1.63142C10.1584 1.41184 10.7264 1.29883 11.3 1.29883C11.8736 1.29883 12.4416 1.41184 12.9715 1.63142C13.5014 1.85099 13.9829 2.17282 14.3884 2.57852C14.794 2.98398 15.1158 3.46537 15.3353 3.99519C15.5549 4.52511 15.6679 5.0931 15.6679 5.66671C15.6679 6.24032 15.5549 6.80831 15.3353 7.33824C15.1157 7.86811 14.794 8.34953 14.3883 8.75502C14.3883 8.75506 14.3883 8.75498 14.3883 8.75502L8.49498 14.6484C8.22161 14.9217 7.77839 14.9217 7.50503 14.6484L1.61169 8.75502C0.792623 7.93595 0.332474 6.82505 0.332474 5.66671C0.332474 4.50837 0.792623 3.39747 1.61169 2.5784C2.43076 1.75933 3.54166 1.29918 4.7 1.29918C5.85834 1.29918 6.96924 1.75933 7.78831 2.5784L8 2.7901L8.21158 2.57852C8.21154 2.57856 8.21162 2.57848 8.21158 2.57852C8.61706 2.17288 9.0986 1.85097 9.62848 1.63142ZM13.3982 3.56824C13.1227 3.29261 12.7956 3.07396 12.4356 2.92479C12.0756 2.77561 11.6897 2.69883 11.3 2.69883C10.9103 2.69883 10.5244 2.77561 10.1644 2.92479C9.80436 3.07396 9.47726 3.29261 9.20176 3.56824L8.49498 4.27502C8.22161 4.54839 7.77839 4.54839 7.50503 4.27502L6.79836 3.56835C6.24184 3.01183 5.48704 2.69918 4.7 2.69918C3.91296 2.69918 3.15816 3.01183 2.60164 3.56835C2.04512 4.12487 1.73247 4.87967 1.73247 5.66671C1.73247 6.45375 2.04512 7.20855 2.60164 7.76507L8 13.1634L13.3984 7.76507C13.674 7.48957 13.8927 7.16235 14.0419 6.80233C14.1911 6.4423 14.2679 6.05642 14.2679 5.66671C14.2679 5.27701 14.1911 4.89112 14.0419 4.5311C13.8927 4.17107 13.6739 3.84374 13.3982 3.56824Z';

  const isFav = isFavorite(product.id);
  const isAdded = isAddedToCart(product.id);
  const pathData = isFav ? PATH_FILLED : PATH_EMPTY;

  const handleCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isAdded) {
      return;
    }

    addToCart(product);
  };

  const handleFavClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isFav) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <div className={styles['product-actions']}>
      <button
        className={classNames(styles['product-actions__btn--cart'], {
          [styles['product-actions__btn--cart-added']]: isAdded,
        })}
        onClick={handleCartClick}
      >
        {isAdded ? t('added_to_cart') : t('add_to_cart')}
      </button>

      <button
        className={styles['product-actions__btn--favourites']}
        onClick={handleFavClick}
      >
        <svg
          className={classNames(styles.icon, {
            [styles['icon--liked']]: isFav,
          })}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" clipRule="evenodd" d={pathData} />
        </svg>
      </button>
    </div>
  );
};
