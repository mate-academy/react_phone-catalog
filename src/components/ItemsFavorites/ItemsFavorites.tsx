import styles from './ItemsFavorites.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';

const getAllLocalStorage = () => {
  const stored = localStorage.getItem('favorites_v1');

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const ItemsFavorites = ({
  itemsfavoritesOpen,
  setItemsFavoritesOpen,
  calback,
}) => {
  const [fav, setFav] = useState(getAllLocalStorage());

  useEffect(() => {
    const updateFav = () => setFav(getAllLocalStorage());

    window.addEventListener('favoritesUpdated', updateFav);

    return () => window.removeEventListener('favoritesUpdated', updateFav);
  }, []);

  return (
    <>
      <nav
        className={
          styles.favoritesSidebar +
          (itemsfavoritesOpen ? ' ' + styles.favoritesSidebar__open : '')
        }
      >
        <div className={styles.favoritesSidebar__header}>
          <div className={styles.favoritesSidebar__back} onClick={calback}>
            <img
              src="src/Icons/rigthArrowBlack.svg"
              alt="Go back"
              className={styles.favoritesSidebar__backIcon}
            />
            <h6 className={styles.favoritesSidebar__backText}>Favourites</h6>
          </div>

          <h1 className={styles.favoritesSidebar__title}>Favourites</h1>
          <h6 className={styles.favoritesSidebar__changeItems}>
            {fav.length} items
          </h6>
        </div>

        <div className={styles.favoritesSidebar__list}>
          {fav.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </nav>

      {itemsfavoritesOpen && (
        <div
          className={styles.favoritesSidebar__overlay}
          onClick={() => setItemsFavoritesOpen(false)}
        />
      )}
    </>
  );
};
