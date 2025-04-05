import s from './Accessories.module.scss';
import { useContext } from 'react';
import { CatalogHeader } from '../../shared/CatalogHeader';
import { ProductContext } from '../../shared/context/ProductsContext';
import { CatalogFilter } from '../../shared/CatalogFilter';
import { ScrollButtons } from '../../shared/ScrollButtons';
import { Catalog } from '../../shared/Catalog';

export const Accessories = () => {
  const { products } = useContext(ProductContext);
  const productsAccessories = products.filter(
    item => item.category === 'accessories',
  );

  return (
    <div className={s.accessories}>
      <CatalogHeader products={productsAccessories} title={'Accessories'} />
      <CatalogFilter />
      <Catalog products={productsAccessories} />
      <ScrollButtons />
    </div>
  );
};
