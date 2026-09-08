import React, { useEffect, useState } from 'react';
import styles from './ProductPages.module.scss';
import { TypeProduct } from '../../types/category';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Product } from '../../types/products';
import { getProducts } from '../../api/products';
import { settingsSlice } from '../../features/settingsSlice';
import classNames from 'classnames';
import { Pagination } from '../../components/Pagination';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
// eslint-disable-next-line max-len
import SceletonListProducts from '../../components/ProductsList/SceletonListProducts';
import { useLocation } from 'react-router-dom';

type Props = {
  category: TypeProduct;
};

const ProductPages: React.FC<Props> = ({ category }) => {
  const dispatch = useAppDispatch();
  const isLoad = useAppSelector(state => state.store.isLoadProducts);
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();

  const productsByCategory = products.filter(
    product => product.category === category,
  );
  const title = () => {
    switch (category) {
      case TypeProduct.phones:
        return 'Mobile phones';
      case TypeProduct.accessories:
        return 'Accessories';
      case TypeProduct.tablets:
        return 'Tablets';
      default:
        return '';
    }
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => {
      clearTimeout(timeout);
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    setProducts([]);
    dispatch(settingsSlice.actions.setIsLoad(true));
    getProducts()
      .then(response => {
        setProducts(response);
      })
      .finally(() => dispatch(settingsSlice.actions.setIsLoad(false)));
  }, [dispatch, category]);

  return (
    <main className={classNames('main')}>
      <Breadcrumbs />
      <h1 className={classNames('main__title')}>{title()}</h1>
      <p
        className={styles.main__count}
      >{`${productsByCategory.length} models`}</p>
      <div className={classNames('main__content')}>
        <Pagination products={productsByCategory} />
        {isLoad && <SceletonListProducts />}
      </div>
    </main>
  );
};

export default ProductPages;
