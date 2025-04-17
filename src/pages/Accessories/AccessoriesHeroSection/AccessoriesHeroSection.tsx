import React from 'react';
import styles from './AccessoriesHeroSection.module.scss';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { Outlet } from 'react-router-dom';

export const AccessoriesHeroSection: React.FC = () => {
  return (
    <>
      <Breadcrumbs />

      <Outlet />
    </>
  );
};
