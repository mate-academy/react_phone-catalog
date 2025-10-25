import classNames from 'classnames';
import { Path } from '../../components/Path/Path';
import { ProductList } from '../shared/ProductList/ProductList';
import styles from './Favourites.module.scss';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../utils/GlobalContext';
import { Product } from '../../types/data';
import { getProducts } from '../../utils/fetchProducts';

export const Favourites: React.FC = () => {
  const { favourites } = useContext(StateContext);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(result =>
        setProducts(result.filter(p => favourites.includes(p.id))),
      )
      .catch(() => setProducts([]));
  }, [favourites]);

  return (
    <div className={classNames(styles.favourites)}>
      <Path />
      <h1 className={classNames(styles.favourites__title)}>Favourites</h1>
      <span className={classNames(styles.favourites__count)}>
        {favourites.length} items
      </span>
      <div className={classNames(styles.favourites__list)}>
        <ProductList list={products} />
      </div>
    </div>
  );
};
