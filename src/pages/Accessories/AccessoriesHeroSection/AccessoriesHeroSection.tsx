import React, { useContext, useMemo } from 'react';
// import styles from './AccessoriesHeroSection.module.scss';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { Outlet } from 'react-router-dom';
import { ProductCatalog } from '@/components/UI/ProductCatalog';
import { ProductContext, ProductContextType } from '@/context/ProductContext';

export const AccessoriesHeroSection: React.FC = () => {
  const { allProducts, isLoading, error } = useContext(
        ProductContext,
      ) as ProductContextType;

      const accessoriesProducts = useMemo(() => {
        return allProducts.filter(
          product => product.category === 'accessories',
        );
      }, [allProducts]);

      if (error) {
        return <div>Error loading products: {error}</div>;
      }

  return (
    <>
      <Breadcrumbs />

      <ProductCatalog
        title="Accessories"
        products={accessoriesProducts}
        isLoading={isLoading}
      />

      <Outlet />
    </>
  );
};
