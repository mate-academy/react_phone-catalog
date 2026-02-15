import classNames from 'classnames';
import styles from './cardButton.module.scss';
import { Icon } from '../icons';
import { icons } from '../../constants/icons';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

type Props = {
  prodDet?: boolean;
  id: string;
};

export const CardButton: React.FC<Props> = ({ prodDet = false, id }) => {
  const {
    addToCart,
    removeFromCart,
    cart,
    removeFavorite,
    favorites,
    addFavorite,
  } = useContext(ProductContext);
  const alreadyAdded = [...cart].includes(id);

  const isFavorite = [...favorites].includes(id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const toggleCart = () => {
    if (alreadyAdded) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  return (
    <div className={styles.cardBtnBlock}>
      <button
        className={classNames(styles.cardBtn, {
          [styles['cardBtn--size']]: prodDet,
          [styles['cardBtn--active']]: alreadyAdded,
        })}
        onClick={toggleCart}
      >
        {alreadyAdded ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        className={classNames(
          styles['button-img'],
          styles['button-img--width'],
          {
            [styles['button-img--size']]: prodDet,
          },
        )}
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <Icon icon={icons.favoritesFilled} />
        ) : (
          <Icon icon={icons.favorites} />
        )}
      </button>
    </div>
  );
};
