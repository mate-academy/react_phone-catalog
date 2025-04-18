import React, { useContext, useMemo } from 'react';
// import styles from './PhonesHeroSection.module.scss';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { Outlet } from 'react-router-dom';
import { ProductCatalog } from '@/components/UI/ProductCatalog';

import { ProductContext, ProductContextType } from '@/context/ProductContext';

export const PhonesHeroSection: React.FC = () => {
  const { allProducts, isLoading, error } = useContext(
    ProductContext,
  ) as ProductContextType;

  const phoneProducts = useMemo(() => {
    return allProducts.filter(product => product.category === 'phones');
  }, [allProducts]);

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <>
      <Breadcrumbs />

      <ProductCatalog
        title="Mobile phones"
        products={phoneProducts}
        isLoading={isLoading}
      />

      <Outlet />
    </>
  );
};
