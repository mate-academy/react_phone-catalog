import React from 'react';

import { AllItemsList } from '../../components/AllItemsList';
import './ProductsCatalogPage.scss';
import { Product } from '../../utils/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Props = {
  title: string;
  allItems: Product[];
  setAllItems: (el: Product[]) => void;
  path: string;
};

export const ProductsCatalogPage: React.FC<Props> = ({
  title,
  allItems,
  setAllItems,
  path,
}) => {
  return (
    <div>
      <Breadcrumbs />
      <div className="title">
        <h1 className="title__name">{title}</h1>
        <p className="title__quantity">{allItems.length} models</p>
      </div>

      <AllItemsList path={path} allItems={allItems} setAllItems={setAllItems} />
    </div>
  );
};
