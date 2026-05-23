import React from 'react';
import { useParams } from 'react-router-dom';
import { Catalog } from './Catalog';
import { CatalogProduct } from '../../../public/types';

import s from './Catalog.module.scss';

interface CatalogWrapperProps {
  products: CatalogProduct[];
}

const CatalogWrapper: React.FC<CatalogWrapperProps> = ({ products }) => {
  const { category } = useParams<{ category: string }>();

  if (!category) {
    return <h2 className={s.errorMessage}>No category provided</h2>;
  }

  if (!products || products.length === 0) {
    return (
      <div className={s.loaderWrapper}>
        <div className={s.loader}>Loading products...</div>
      </div>
    );
  }

  return <Catalog />;
};

export default CatalogWrapper;
