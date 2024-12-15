import { useAppSelector } from '../../api/hooks';
import CategoriesTop from '../CategoriesTop/CategoriesTop';
import Product from '../Product/Product';
import styles from './ProductList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination';
import Dropdowns from '../Dropdowns/Dropdowns';
import React from 'react';
// eslint-disable-next-line max-len
import { getPreparedProducts } from '../../modules/shared/utils/getPreparedProducts';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import { useTranslation } from 'react-i18next';
import Skeleton from '../Skeleton/Skeleton';

type Props = {
  filter: string;
  h1: string;
};

const ProductList: React.FC<Props> = ({ filter, h1 }) => {
  const { listOfproducts, loaded } = useAppSelector(state => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  //search params
  const sortBy = searchParams.get('sort') || t('newest');
  let perPage = +(searchParams.get('perPage') || 8);
  const currPage = +(searchParams.get('page') || 1);

  //list
  const preparedProducts = getPreparedProducts(listOfproducts, filter, sortBy);
  const length = preparedProducts.length;

  // if page=all then perPage = preparedPhones
  perPage = isNaN(perPage) ? length : perPage;

  //Pagination
  const lastItemIndex = perPage * currPage;
  const firstItemIndex = lastItemIndex - perPage;
  const preparedItems = preparedProducts.slice(firstItemIndex, lastItemIndex);

  const handleCurrPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', `${page}`);
    }

    setSearchParams(params);
    scrollTo(0, 0);
  };

  return (
    <section className={styles.section}>
      <BreadCrumbs />
      <CategoriesTop h1={h1} models={length} />
      <Dropdowns sortBy={sortBy} perPage={perPage} />
      {loaded ? (
        <>
          <div className={styles.productList}>
            {preparedItems.map(product => (
              <Product product={product} key={product.id} />
            ))}
          </div>
          {perPage < 33 && (
            <Pagination
              total={preparedProducts.length}
              perPage={perPage}
              currentPage={currPage}
              onPageChange={handleCurrPageChange}
            />
          )}
        </>
      ) : (
        <Skeleton />
      )}
    </section>
  );
};

export default ProductList;
