import classNames from 'classnames';
import s from './Favourites.module.scss';
import { useContext } from 'react';
import { ProductContext } from '../../shared/context/ProductsContext';
import { Catalog } from '../../shared/Catalog';
import { CatalogHeader } from '../../shared/CatalogHeader';
import { RightButtonContext } from '../../shared/context/RightButtonContext';
import { useTranslation } from 'react-i18next';

export const Favourites = () => {
  const { t } = useTranslation('Favourites');
  const { favourites } = useContext(RightButtonContext);
  const { products } = useContext(ProductContext);
  const favouritesProducts = products.filter(item =>
    favourites.includes(item.id),
  );

  return (
    <div className={classNames(s.favourites, 'container')}>
      <CatalogHeader products={favouritesProducts} title={t('Favourites')} />
      <Catalog products={favouritesProducts} />
    </div>
  );
};
