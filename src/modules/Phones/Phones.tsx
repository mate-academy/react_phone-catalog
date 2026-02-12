import { useContext } from 'react';
import { CatalogFilter } from '../../shared/CatalogFilter';
import { ScrollButtons } from '../../shared/ScrollButtons';
import s from './Phones.module.scss';
import { ProductContext } from '../../shared/context/ProductsContext';
import { CatalogHeader } from '../../shared/CatalogHeader';
import { Catalog } from '../../shared/Catalog';
import { useTranslation } from 'react-i18next';

export const Phones = () => {
  const { t } = useTranslation('Phones');
  const { products } = useContext(ProductContext);
  const productsPhone = products.filter(item => item.category === 'phones');

  return (
    <div className={s.phones}>
      <CatalogHeader products={productsPhone} title={`${t('Phones')}`} />
      <CatalogFilter />
      <Catalog products={productsPhone} />
      <ScrollButtons />
    </div>
  );
};
