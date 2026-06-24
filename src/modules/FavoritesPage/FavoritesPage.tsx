import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductList';
import { useShop } from '../../context/ShopContext';
import { getProducts } from '../../services/api';
import { Product } from '../../types/catalog';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  const favoriteProducts = products.filter(product =>
    favorites.includes(product.itemId),
  );

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{favoriteProducts.length} items</p>

      {favoriteProducts.length === 0 ? (
        <p className={styles.emptyState}>You have no favorite products yet.</p>
      ) : (
        <ProductList products={favoriteProducts} />
      )}
    </section>
  );
};
