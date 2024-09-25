import { FC } from 'react';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
// import classNames from 'classnames';
import styles from './CardButtons.module.scss';

export const CardButtons: FC = ({}) => {
  const { favoriteSelected, favoritesUrl } = useIconSrc();

  return (
    <div className={styles.buttons}>
      <button className={styles.buttonCard}>
        <p className={styles.buttonText}>
          {/* {isProductInCart ? 'Remove' : 'Add to cart'} */}
          {'Add to cart'}
        </p>
      </button>
      <button className={styles.buttonFavorite}>
        <img
          className={styles.buttonFavoriteIcon}
          src={false ? favoriteSelected : favoritesUrl}
          alt="favorite"
        />
      </button>
    </div>
  );
};
