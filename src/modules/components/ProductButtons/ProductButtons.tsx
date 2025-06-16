import favourite from '../../../img/icons/favourite-button.svg';
import favouriteAdd from '../../../img/icons/favourite-button-add.svg';
import favouriteAddBlack from '../../../img/icons/favourite-button-black.svg';
import styles from './ProductButtons.module.scss';

type Props = {
  isFavourite: boolean;
  isInCart: boolean;
  isLightMode: boolean;
  handleCartClick: () => void;
  handleFavouriteClick: () => void;
};

export const ProductButtons: React.FC<Props> = ({
  isFavourite,
  isInCart,
  isLightMode,
  handleCartClick,
  handleFavouriteClick,
}) => {
  return (
    <div className={styles.product__buttons}>
      <button
        className={`${styles.product__button__add} ${isInCart ? styles['product__button__add--active'] : ''}`}
        onClick={handleCartClick}
      >
        <span className={styles.product__buttons__title}>
          {isInCart ? 'Added' : 'Add to cart'}
        </span>
      </button>
      <button
        className={styles.product__button__favourite}
        onClick={handleFavouriteClick}
      >
        <img
          className={styles.product__button__icon}
          src={
            !isLightMode
              ? isFavourite
                ? favouriteAdd
                : favourite
              : isFavourite
                ? favouriteAdd
                : favouriteAddBlack
          }
          alt="favourite"
        />
      </button>
    </div>
  );
};
