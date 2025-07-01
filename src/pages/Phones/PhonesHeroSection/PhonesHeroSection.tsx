import React, { useContext, useMemo } from 'react';
import styles from './PhonesHeroSection.module.scss';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { Outlet, useParams } from 'react-router-dom';
import { ProductCatalog } from '@/components/UI/ProductCatalog/ProductCatalog';

import { ProductContext, ProductContextType } from '@/context/ProductContext';
import { useTranslation } from 'react-i18next';

export const PhonesHeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { allProducts, isLoading, error } = useContext(
    ProductContext,
  ) as ProductContextType;

  const { itemId } = useParams<{ itemId?: string }>();

  const phoneProducts = useMemo(() => {
    return allProducts.filter(product => product.category === 'phones');
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
          title={t(`productCatalog.titlePhones`)}
          products={phoneProducts}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );
};
