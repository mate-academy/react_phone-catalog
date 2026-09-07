/* eslint-disable */
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

import { ProductCart } from '../cardItem/ProductCart';
import { Loader } from '../Loader';
import styles from './ProductList.module.scss';
import { ControlPagination } from '../paginationControl/ControlPagination';
import { Filter } from '../filter/Filter';
import { ProductNotFound } from '../productNotFound/ProductNotFound';
import { ReloadButton } from '../reloadButton/ReloadButton';

export const ProductList = () => {
  const AllProducts = useAppSelector(state => state.products.products);
  const downloadError = useAppSelector(state => state.products.error);
  const loading = useAppSelector(state => state.products.loading);
  const filterStatus = useAppSelector(state => state.filter.status);
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const categoryProducts = AllProducts.filter(
    product => product.category === category,
  );
  const perPages = useAppSelector(state => state.pagination.status);
  const currentPage = useAppSelector(state => state.pagination.currentPage);

  const visibleGoods = [...categoryProducts].sort((a, b) => {
    if (filterStatus === 'age') {
      return b.year - a.year;
    }

    if (filterStatus === 'name') {
      return a.name.localeCompare(b.name);
    }

    if (filterStatus === 'price') {
      return b.price - a.price;
    }

    return 0;
  });

  const paginationGoods =
    perPages === 'all'
      ? visibleGoods
      : visibleGoods.slice(
          (currentPage - 1) * +perPages,
          currentPage * +perPages,
        );

  return (
    <>
      {' '}
      {loading && <Loader />}
      {visibleGoods.length === 0 && categoryProducts.length > 0 && (
        <p className="notification is-warning">
          There are no products matching current filter criteria
        </p>
      )}
      {visibleGoods.length > 0 && <Filter />}
      <div className={styles.product__list}>
        {!categoryProducts && !downloadError && (
          <ProductNotFound type={category} />
        )}
        {downloadError && <ReloadButton />}
        {<ProductCart products={paginationGoods} types={'grid'} />}
      </div>
      {perPages !== 'all' && (
        <ControlPagination allGoods={visibleGoods} perPages={perPages} />
      )}
    </>
  );
};
