import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../context/FavoriteContext';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Loader } from '../../components/Loader';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/Api';
import styles from './FavouritesPage.module.scss';

import NoFavoritesImage from './icons/no-favorite.png';

export const FavouritesPage: React.FC = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load favorite products
  useEffect(() => {
    const loadFavoriteProducts = async () => {
      try {
        setIsLoading(true);
        const allProducts = await getProducts();

        // Filter products that are in favorites
        const filteredProducts = allProducts.filter(product => favorites.includes(product.id));

        setFavoriteProducts(filteredProducts);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoriteProducts();
  }, [favorites]);

  const itemsCount = favorites.length;

  // Show loader while loading
  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Breadcrumb items={[{ label: t('favourites') }]} />
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: t('favourites') }]} />

        {/* Page Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{t('favourites')}</h1>
          <p className={styles.itemsCount}>{t('itemsCount', { count: itemsCount })}</p>
        </div>

        {/* Content */}
        {favoriteProducts.length === 0 ? (
          // Empty State
          <div className={styles.emptyState}>
            <div className={styles.emptyStateContent}>
              <img src={NoFavoritesImage} alt={t('noFavourites')} className={styles.emptyStateImage} />
              <h2 className={styles.emptyStateTitle}>{t('noFavourites')}</h2>
              <p className={styles.emptyStateDescription}>{t('noFavouritesDescription')}</p>
              <Link to="/" className={styles.startShoppingButton}>
                {t('startShopping')}
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
