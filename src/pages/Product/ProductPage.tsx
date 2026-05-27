import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '@/shared/components/PageHeader/PageHeader';
import ProductGallery from '@/features/product/ProductGallery';
import { ProductConfigurator } from '@/features/product/ProductConfigurator';
import { BackButton } from '@/shared/components/BackButton/BackButton';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import { Loader } from '@/shared/components/Loader';
import { ProductsSlider } from '@/features/home/ProductsSlider';

import { ProductDetailsSection } from './components/ProductDetailsSection';
import { SpecsList } from './components/SpecsList';
import { useProductDetails } from '@/features/product/hooks/userProductsDetails';
import { useProducts } from '@/features/product/hooks/useProducts';
import { useSuggestedProducts } from '@/features/product/hooks/useSuggestedProducts';
import { useRecentlyViewed } from '@/features/product/hooks/useRecentlyViewed';

import styles from './ProductPage.module.scss';

export const ProductPage: React.FC = () => {
  const { category, productSlug } = useParams();

  // 1. Використовуємо хуки для отримання даних
  const {
    product,
    loading,
    selectedColor,
    setSelectedColor,
    selectedCapacity,
    setSelectedCapacity,
  } = useProductDetails(category, productSlug);

  const products = useProducts();
  const suggestedProducts = useSuggestedProducts();

  const foundProductFromProducts = useMemo(
    () => products.find(p => p.itemId === productSlug),
    [products, productSlug],
  );

  // 2. Хук для побічних ефектів
  useRecentlyViewed(foundProductFromProducts?.itemId);

  // 3. Рендеринг станів завантаження або помилки
  if (loading) {
    return (
      <div className={styles['product-page__loader']}>
        <Loader />
      </div>
    );
  }

  if (!product) {
    return <NotFoundPage />;
  }

  // 4. Головний рендеринг сторінки
  return (
    <>
      <PageHeader
        title={product.name}
        variant="productPage"
        extraContent={<BackButton label="Back" />}
      />

      <section className={styles['product-page__hero']}>
        <ProductGallery photos={product.images} />
        <div className={styles['product-page__container--wrapper']}>
          <ProductConfigurator
            product={product}
            setSelectedColor={setSelectedColor}
            selectedColor={selectedColor}
            setSelectedCapacity={setSelectedCapacity}
            selectedCapacity={selectedCapacity}
            foundProductFromProducts={foundProductFromProducts}
          />
        </div>
      </section>

      <section className={styles['product-page__details']}>
        <ProductDetailsSection description={product.description} />
        <SpecsList product={product} />
      </section>

      <ProductsSlider
        products={suggestedProducts}
        title="You may also like"
        showDiscount
      />
    </>
  );
};
