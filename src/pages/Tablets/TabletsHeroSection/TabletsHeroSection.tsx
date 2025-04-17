import React from 'react';
import styles from './TabletsHeroSection.module.scss';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { Outlet } from 'react-router-dom';

export const TabletsHeroSection: React.FC = () => {
  return (
    <>
      <Breadcrumbs />

      <Outlet />
    </>
  );
};
