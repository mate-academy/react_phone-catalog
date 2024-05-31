import styles from './ActionButtons.module.scss';

let isProductInCart = true; // DELETE LATER

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
          src="../../../public/images/icons/FavoritesIcon.svg"
          alt="favorite"
        />
      </button>
    </div>
  );
}
