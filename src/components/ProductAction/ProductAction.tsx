import classNames from 'classnames';
import styles from './ProductAction.module.scss';
import { Products } from '../../types/Products';
import { AddButtonToCart } from '../AddButtonToCart/AddButtonToCart';
import { useContext } from 'react';
import FavoriteContext from '../../Contexts/FavoriteContext';

type Props = {
  variant?: 'smallButtonSize' | 'bigButtonSize';
  product: Products;
};

export const ProductAction: React.FC<Props> = ({
  variant = 'smallButtonSize',
  product,
}) => {
  const { favoritesItems, addToFavorites, removeFromFavorites } =
    useContext(FavoriteContext);
  const isFavorite = favoritesItems.some(item => item.id === product.id);

  const toggleFavorite = (prod: Products) => {
    if (!isFavorite) {
      addToFavorites(prod);
    } else {
      removeFromFavorites(prod.id);
    }
  };

  return (
    <>
      <AddButtonToCart product={product} variant={variant} />

      <button
        className={classNames(styles.buttons, styles.buttonFavorite, {
          [styles.favoriteBig]: variant === 'bigButtonSize',
          [styles.isFavourite]: isFavorite,
        })}
        aria-label="Add to favourites"
        onClick={() => {
          toggleFavorite(product);
        }}
      >
        <img
          src={
            isFavorite
              ? './img/icons/Favourites_Filled.svg'
              : './img/icons/heart-Icon.svg'
          }
          alt="heart-logo"
          className={styles.buttonFavorite__icon}
        />
      </button>
    </>
  );
};

export default ProductAction;
