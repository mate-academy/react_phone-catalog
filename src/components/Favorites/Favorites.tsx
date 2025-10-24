import styles from './Favorites.module.scss';
import { ItemsPanel } from '../ItemsPanel/ItemsPanel';

export const Favorites = ({ favoritesOpen, setFavoritesOpen, calback }) => {
  return (
    <>
      <nav
        className={`${styles.favorites} ${favoritesOpen ? styles.favoritesOpen : ''}`}
      >
        <div className={styles.favoritesHeader}>
          <div className={styles.favoritesBack} onClick={calback}>
            <img
              src="src/Icons/rigthArrowBlack.svg"
              alt="Voltar"
              className={styles.favoritesBackImg}
            />
            <h6 className={styles.favoritesBackText}>Back</h6>
          </div>

          <h1 className={styles.favoritesTitle}>Cart</h1>
        </div>

        <ItemsPanel />
      </nav>

      {favoritesOpen && (
        <div
          className={styles.favoritesOverlay}
          onClick={() => setFavoritesOpen(false)}
        />
      )}
    </>
  );
};
