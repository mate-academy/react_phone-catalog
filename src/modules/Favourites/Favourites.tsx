import classNames from 'classnames';
import s from './Favourites.module.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useContext } from 'react';
import { ProductContext } from '../../shared/context/ProductsContext';
import { Catalog } from '../../shared/Catalog';
import { CatalogHeader } from '../../shared/CatalogHeader';

export const Favourites = () => {
  const [favourites] = useLocalStorage<number[]>('favourites', []);
  const { products } = useContext(ProductContext);
  const favouritesProducts = products.filter(item =>
    favourites.includes(item.id),
  );

  return (
    <div className={classNames(s.favourites, 'container')}>
      <CatalogHeader products={favouritesProducts} title={'Favourites'} />
      <Catalog products={favouritesProducts} />
    </div>
  );
};
