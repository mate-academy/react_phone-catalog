import { NavLink } from 'react-router-dom';
import styles from '../Catalog/Catalog.module.scss';
import { useFavorites } from '../../ItemsProvider';
import { ProductCard } from '../../components/ProductCard';
import './Favorites.scss';

export const Favorites = () => {
  const { favoritesItems } = useFavorites();

  return (
    <section className="favorites">
      <nav className={styles.catalog__nav}>
        <NavLink to="/" className={styles['catalog__home-icon']} />
        <div className={styles.catalog__arrow} />
        <span className={styles['catalog__current-page']}>Favorites</span>
      </nav>
      <div className="favorites-head">
        <h1 className="favorites__title">Favourites</h1>
        <p className="favorites__itemsCount">{favoritesItems.length} items</p>
      </div>
      <article className="favorites__itemsContainer">
        {favoritesItems.map(item => {
          return (
            <ProductCard
              product={item}
              key={item.id}
              classForCard="favorites__card"
            />
          );
        })}
      </article>
    </section>
  );
};
