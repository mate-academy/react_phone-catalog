import s from './Tablets.module.scss';
import { useContext } from 'react';
import { CatalogHeader } from '../../shared/CatalogHeader';
import { ProductContext } from '../../shared/context/ProductsContext';
import { CatalogFilter } from '../../shared/CatalogFilter';
import { ScrollButtons } from '../../shared/ScrollButtons';
import { Catalog } from '../../shared/Catalog';

export const Tablets = () => {
  const { products } = useContext(ProductContext);
  const productsTablets = products.filter(item => item.category === 'tablets');

  return (
    <div className={s.tablets}>
      <CatalogHeader products={productsTablets} />
      <CatalogFilter />
      <Catalog products={productsTablets} />
      <ScrollButtons />
    </div>
  );
};
