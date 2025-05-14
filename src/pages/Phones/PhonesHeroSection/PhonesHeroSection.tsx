import React, { useContext, useMemo } from 'react';
import styles from './PhonesHeroSection.module.scss';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { Outlet, useParams } from 'react-router-dom';
import { ProductCatalog } from '@/components/UI/ProductCatalog';

import { ProductContext, ProductContextType } from '@/context/ProductContext';

export const PhonesHeroSection: React.FC = () => {
  const { allProducts, isLoading, error } = useContext(
    ProductContext,
  ) as ProductContextType;

  const { itemId } = useParams<{ itemId?: string }>();

  const phoneProducts = useMemo(() => {
    return allProducts.filter(product => product.category === 'phones');
  }, [allProducts]);

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <>
      <Breadcrumbs
        classNameCustom={itemId ? styles.customBreadcrumbs : undefined}
      />

      {itemId ? (
        <Outlet />
      ) : (
        <ProductCatalog
          title="Mobile phones"
          products={phoneProducts}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
