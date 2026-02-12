import { Link } from 'react-router-dom';
import { useFavorites } from '../shared/context/FavoritesContext';
import { ProductCard } from '../shared/components/ProductCard';
import { Container } from '../shared/components/Container';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { items } = useFavorites();

  return (
    <Container>
      <div className={styles.page}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/" className={styles.breadcrumbLink}>
            <img
              src="img/icons/home.svg"
              alt="Home"
              className={styles.homeIcon}
            />
          </Link>

          <img
            src="img/icons/vector.svg"
            alt=""
            className={styles.separatorIcon}
          />
          <span className={styles.current}>Favourites</span>
        </nav>

        <h1 className={styles.title}>Favourites</h1>
        <p className={styles.subtitle}>{items.length} items</p>

        {items.length === 0 ? (
          <p className={styles.empty}>There are no favourites yet</p>
        ) : (
          <div className={styles.grid}>
            {items.map(p => (
              <ProductCard key={String(p.itemId ?? p.id)} product={p} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};
