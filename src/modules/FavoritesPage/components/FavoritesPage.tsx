import styles from './FavoritesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductCard } from '../../../components/ProductCard';
import { useProducts } from '../../../hooks/use-products';
import { Loader } from '../../../components/Loader';
import { useAppContext } from '../../../hooks/use-context';

export const FavoritesPage = () => {
  const { products, loading, error } = useProducts();
  const { wishlistIds } = useAppContext();

  const Favourites = products.filter(item => wishlistIds.includes(item.itemId));

  return (
    <>
      <Header />

      {loading && <Loader />}

      {error && <div>{error}</div>}

      <main className={styles.main}>
        <div className={styles.container}>
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
            <img
              src="../public/img/product-not-found.png"
              alt="Product not found"
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
