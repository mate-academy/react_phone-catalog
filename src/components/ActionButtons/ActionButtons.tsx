import styles from './ActionButtons.module.scss';
import favoritesIcon from './img/fav.module.svg'
/* const favoritesIcon = './img/fav.jpg'; */

const isProductInCart = true; // DELETE LATER

export const ActionButtons: React.FC = () => {
  return (
    <div className={styles.buttons}>
      <button className={styles.buttonCard}>
        <p className={styles.buttonText}>
          {isProductInCart ? 'Remove' : 'Add to cart'}
        </p>
      </button>
      <button className={styles.buttonFavorite}>
        <img
          className={styles.buttonFavoriteIcon}
          src={favoritesIcon}
          alt="favorite"
        />
      </button>
    </div>
  );
};
