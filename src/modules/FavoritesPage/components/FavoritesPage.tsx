import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductCard } from '../../../components/ProductCard';
import { useProducts } from '../../../hooks/use-products';
import { useAppContext } from '../../../hooks/use-context';
import { Loader } from '../../../components/Loader';
import { BaseProduct } from '../../../types';
import { Link } from 'react-router-dom';

export const FavoritesPage = () => {
  const { products, loading, error } = useProducts<BaseProduct>();
  const { wishlistIds } = useAppContext();

  const Favourites = products.filter(item => wishlistIds.includes(item.itemId));

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Favourites' }]} />
      <h1 className={styles.title}>Favourites</h1>
      {Favourites.length > 0 ? (
        <>
          <p className={styles.count}>{Favourites.length} items</p>

          <div className={styles.grid}>
            {Favourites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className={styles.title}>No product in the wishlist</p>
          <Link to="/" className={styles.link}>
            Go to home page
          </Link>
          <img
            className="not-scale"
            src="img/product-not-found.png"
            alt="Product not found"
          />
        </>
      )}
    </>
  );
};
