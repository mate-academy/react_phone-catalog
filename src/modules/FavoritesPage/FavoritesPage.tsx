import React, { useEffect, useState } from 'react';
import styles from './FavoritesPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumb } from '../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setProducts } from '../../store/productsSlice';
import { getProducts } from '../../api/products';
import { Loader } from '../../components/Loader/Loader';

export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const products = useSelector((state: RootState) => state.products);
  const favoriteIds = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        dispatch(setProducts(data));
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [dispatch]);

  const favoriteProducts = products.filter(prod =>
    favoriteIds.includes(prod.itemId),
  );

  const validFavoriteProducts = favoriteProducts.filter(
    product =>
      typeof product.itemId === 'string' && product.itemId.trim() !== '',
  );

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.pageContent}>
        <Breadcrumb current="Favorites" />
        <h1 className={styles.title}>Favorites</h1>

        {loading ? (
          <Loader />
        ) : favoriteProducts.length === 0 ? (
          <div className={styles.emptyWrapper}>
            <img
              src="/react_phone-catalog/img/cart-is-empty.png"
              alt="No favorites"
              className={styles.emptyImage}
            />
            <p className={styles.empty}>No favorite products yet</p>
          </div>
        ) : (
          <>
            <p className={styles.count}>{favoriteProducts.length} items</p>
            <ul className={styles.list}>
              {validFavoriteProducts.map(product => (
                <li key={product.itemId} className={styles.item}>
                  <ProductCard
                    product={product}
                    showFullPrice={product.fullPrice > product.price}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
