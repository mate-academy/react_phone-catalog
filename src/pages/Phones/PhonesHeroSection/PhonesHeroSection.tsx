import React from 'react';
import styles from './PhonesHeroSection.module.scss';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { Outlet } from 'react-router-dom';
import { ProductCatalog } from '@/components/UI/ProductCatalog';

export const PhonesHeroSection: React.FC = () => {
  return (
    <>
      <Breadcrumbs />

      <ProductCatalog />

      <Outlet />
    </>
  );
};
