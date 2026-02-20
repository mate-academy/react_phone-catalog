import React, { useContext, useMemo } from 'react';
import styles from './AccessoriesHeroSection.module.scss';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { Outlet, useParams } from 'react-router-dom';
import { ProductCatalog } from '@/components/UI/ProductCatalog';
import { ProductContext, ProductContextType } from '@/context/ProductContext';
import { useTranslation } from 'react-i18next';

export const AccessoriesHeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { allProducts, isLoading, error } = useContext(
    ProductContext,
  ) as ProductContextType;
  const { itemId } = useParams<{ itemId?: string }>();

  const accessoriesProducts = useMemo(() => {
    return allProducts.filter(product => product.category === 'accessories');
  }, [allProducts]);

  return (
    <>
      <Breadcrumbs
        classNameCustom={itemId ? styles.customBreadcrumbs : undefined}
      />

      {itemId ? (
        <Outlet />
      ) : (
        <ProductCatalog
          title={t(`productCatalog.titleAccessories`)}
          products={accessoriesProducts}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );
};
