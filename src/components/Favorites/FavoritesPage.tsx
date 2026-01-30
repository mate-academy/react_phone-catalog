import styles from './favorites.module.scss';
import { useFavorites } from '../../FavoriteContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import homeIcon from '../../img/icons/Home.svg';
import arrowRight from '../../img/icons/Chevron Arrow Left.svg';

export const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();

  const breadcrumb = (
    <div className={styles.breadcrumb}>
      <Link to="/" className={styles.breadcrumbLink}>
        <img src={homeIcon} alt="Home" className={styles.homeIcon} />
      </Link>
      <img src={arrowRight} alt="" className={styles.breadcrumbArrow} />
      <span className={styles.breadcrumbCurrent}>Favorites</span>
    </div>
  );

  if (!favorites.length) {
    return (
      <section className={styles.favorites}>
        <div className="container">
          {breadcrumb}
          <h2 className={styles.title}>Favorites</h2>
          <p>No favorites yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.favorites}>
      <div className="container">
        {breadcrumb}
        <h2 className={styles.title}>Favorites</h2>
        <span className={styles.subtitle}>{favorites.length} items</span>

        <div className={styles.cards}>
          {favorites.map(item => (
            <ProductCard
              key={item.id}
              id={item.id}
              itemId={item.itemId}
              name={item.name}
              image={item.image}
              price={item.price}
              fullPrice={item.fullPrice}
              screen={item.screen}
              capacity={item.capacity}
              ram={item.ram}
              isFavorite={true}
              onToggleFavorite={() => removeFavorite(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
