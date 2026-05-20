import styles from './ProductPage.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { AnimatePresence, motion } from 'motion/react';
import { fetchAllProducts } from '@/api/products';
import { useProductDetails } from '@/features/products/hooks/useProductDetails';
import { ProductGallery } from '@/features/products/components/ProductGallery';
import { ProductInfo } from '@/features/products/components/ProductInfo';
import { ProductDescription } from '@/features/products/components/ProductDescription';
import { ProductTechSpecs } from '@/features/products/components/ProductTechSpecs';
import { ProductNotFoundPage } from '@/pages/ProductNotFoundPage';
import { Product } from '@/features/products/types/product';
import { useProductStore } from '@/store/productStore';
import { useCallback, useEffect } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { ProductPageSkeleton } from '@/components/layout/ProductPageSkeleton';
import { Carousel } from '@/components/ui/Carousel';
import { getHighPrices } from '@/utils/getHighPrices';
import { ProductCard } from '@/features/products/components/ProductCard';
import { QUERY_KEYS } from '@/api/queryKeys';

export const ProductPage = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const setCurrentProductName = useProductStore(
    state => state.setCurrentProductName,
  );

  const category = pathname.split('/')[1];

  const selectBaseProduct = useCallback(
    (products: Product[]) => products.find(p => p.itemId === productId),
    [productId],
  );

  const { data: baseProduct, isLoading: isBaseProductLoading } = useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: fetchAllProducts,
    select: selectBaseProduct,
  });

  const selectHighPrices = useCallback(
    (products: Product[]) => getHighPrices(products, 10),
    [],
  );

  const { data: highPriceProducts = [], isLoading: isHighPricesLoading } =
    useQuery({
      queryKey: QUERY_KEYS.products,
      queryFn: fetchAllProducts,
      select: selectHighPrices,
    });

  const { data: product, isLoading: isDetailsLoading } = useProductDetails(
    productId ?? '',
    category ?? '',
  );

  const isPageLoading =
    isBaseProductLoading || isDetailsLoading || isHighPricesLoading;

  useEffect(() => {
    if (baseProduct?.name) {
      setCurrentProductName(baseProduct.name);
    }

    return () => setCurrentProductName(undefined);
  }, [baseProduct?.name, setCurrentProductName]);

  if (isPageLoading) {
    return <ProductPageSkeleton />;
  }

  if (!baseProduct) {
    return <ProductNotFoundPage />;
  }

  if (!product) {
    return <ProductNotFoundPage />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.page}>
          <BackButton />
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.topSection}>
            <ProductGallery images={product.images} name={product.name} />
            <ProductInfo product={product} baseProduct={baseProduct} />
          </div>

          <div className={styles.bottomSection}>
            <ProductDescription description={product.description} />
            <ProductTechSpecs product={product} />
          </div>
        </div>
        <Carousel title={t('titles.YML')}>
          {highPriceProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </Carousel>
      </motion.div>
    </AnimatePresence>
  );
};
