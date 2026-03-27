import styles from './HotPricesSection.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Carousel } from '@/components/ui/Carousel/Carousel';
import { ProductCard } from '@/features/products/components/ProductCard';
import { fetchAllProducts } from '@/api/products';
import { fetchPhoneDetails } from '@/api/phoneDetails';
import { getHotPrices } from '@/utils/getHotPrices';
import { ProductCardSkeleton } from '@/features/products/components/ProductCardSkeleton';
import { motion } from 'motion/react';

export const HotPricesSection = () => {
  const { t } = useTranslation();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const { data: details = [] } = useQuery({
    queryKey: ['productDetails'],
    queryFn: fetchPhoneDetails,
  });

  const hotProducts = getHotPrices(products, details, 10);

  return (
    <>
      {isLoading ? (
        <section className={styles.section}>
          <h2 className={styles.title}>{t('titles.hotPrices')}</h2>
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
      ) : (
        <Carousel title={t('titles.hotPrices')}>
          {hotProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      )}
    </>
  );
};
