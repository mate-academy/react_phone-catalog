import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import { useTranslation } from 'react-i18next';
import { fetchAllProducts } from '@/api/products';
import { useProductDetails } from '@/features/products/hooks/useProductDetails';
import { ProductGallery } from '@/features/products/components/ProductGallery';
import { ProductInfo } from '@/features/products/components/ProductInfo';
import { ProductDescription } from '@/features/products/components/ProductDescription';
import { ProductTechSpecs } from '@/features/products/components/ProductTechSpecs';
import { ProductNotFoundPage } from '@/pages/ProductNotFoundPage';
import { Product } from '@/features/products/types/product';
import styles from './ProductPage.module.scss';
import { useProductStore } from '@/store/productStore';
import { useEffect } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { ProductPageSkeleton } from '@/components/layout/ProductPageSkeleton';

export const ProductPage = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const setCurrentProductName = useProductStore(
    state => state.setCurrentProductName,
  );
  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });
  const baseProduct = allProducts.find(p => p.itemId === productId);

  useEffect(() => {
    if (baseProduct?.name) {
      setCurrentProductName(baseProduct.name);
    }

    return () => setCurrentProductName(undefined);
  }, [baseProduct?.name, setCurrentProductName]);

  const category = pathname.split('/')[1];

  const { data: product, isLoading } = useProductDetails(
    productId ?? '',
    category ?? '',
  );

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (!baseProduct) {
    return <ProductNotFoundPage />;
  }

  if (!product) {
    return <ProductNotFoundPage />;
  }

  return (
    <div className={styles.page}>
      <BackButton />
      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.topSection}>
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} baseProduct={baseProduct} />
        <p className={styles.productId}>ID: {baseProduct?.id}</p>
      </div>

      <div className={styles.bottomSection}>
        <ProductDescription description={product.description} />
        <ProductTechSpecs product={product} />
      </div>
    </div>
  );
};
