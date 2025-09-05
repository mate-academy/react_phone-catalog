import React from 'react';
import style from './ProductsCatalogPage.module.scss';
import { AllItemsList } from '../../components/AllItemsList/AllItemsList';
import { Product } from '../../utils/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

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
    <div className={style.catalog}>
      <Breadcrumbs />

      <div className={style.title}>
        <h1 className={style.title_name}>{title}</h1>
        <p className={style.title_quantity}>{allItems.length} models</p>
      </div>

      <AllItemsList
        path={path}
        allItems={allItems}
        setAllItems={setAllItems}
        categoryName={title}
      />
    </div>
  );
};
