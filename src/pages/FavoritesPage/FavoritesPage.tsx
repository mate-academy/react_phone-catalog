import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useProductStore } from '@/store/productStore';
import { fetchAllProducts } from '@/api/products';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/types/product';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { t } = useTranslation();
  const { favorites } = useProductStore();

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const favoriteProducts = allProducts.filter(p => favorites.includes(p.id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('favorites.title')}</h1>
      <p className={styles.count}>
        {t('favorites.count', { count: favoriteProducts.length })}
      </p>

      {favoriteProducts.length === 0 ? (
        <div className={styles.empty}>
          <p>{t('favorites.empty')}</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favoriteProducts.map(product => (
            <div key={product.id} className={styles.card}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
