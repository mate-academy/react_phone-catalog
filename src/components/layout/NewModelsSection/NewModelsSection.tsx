import styles from './NewModelsSection.module.scss';
import { fetchAllProducts } from '@/api/products';
import { Carousel } from '@/components/ui/Carousel';
import { ProductCard } from '@/features/products/components/ProductCard';
import { getNewestModels } from '@/utils/getNewestModels';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ProductCardSkeleton } from '@/features/products/components/ProductCardSkeleton';
import { motion } from 'motion/react';
import { QUERY_KEYS } from '@/api/queryKeys';

export const NewModelsSection = () => {
  const { t } = useTranslation();

  const { data: products, isLoading } = useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: fetchAllProducts,
    select: data => getNewestModels(data, 10),
  });

  if (isLoading) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>{t('titles.brandNew')}</h2>
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              className={styles.skeletonItem}
              key={`skeleton-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCardSkeleton />
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <Carousel title={t('titles.brandNew')}>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      )) ?? []}
    </Carousel>
  );
};
