import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { GlobalContext } from '../../GlobalContext';
import { FILTER_BY, SORT_BY } from './constants';

import { sortFunction } from './helpers/sortFunction';
import { Product } from '../../types/Product';

import { DropDown } from './components/DropDown';
import { ProductsList } from './components/ProductsList';
import { Pagination } from './components/Pagination';
import { NoResults } from './components/NoResults';
import { Loader } from '../Loader/Loader';
import { Breadcrumbs } from '../Breadcrumbs';

import classes from './PageContent.module.scss';

type Props = {
  products: Product[];
  title: string;
};

export const PageContent: React.FC<Props> = ({ products, title }) => {
  const { isLoading } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const currentPage = searchParams.get('page') || '';

  const handleSortByChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);
  };

  const handlePerPageChange = (value: string) => {
    if (value === perPage) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
      params.delete('page');
    } else {
      params.set('page', '1');
      params.set('perPage', value);
    }

    setSearchParams(params);
  };

  const handlePageChange = (value: number) => {
    if (value === +currentPage) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set('page', value.toString());
    setSearchParams(params);
  };

  const preparedList = useMemo(() => {
    const list = sortFunction(products, sortBy);

    const pageNumber = Number(currentPage) ? +currentPage : 1;
    const pageSize = Number(perPage) ? +perPage : products.length;

    return list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }, [products, perPage, currentPage, sortBy]);

  return (
    <div className={classes.PageContent}>
      <Breadcrumbs />

      {!products.length && !isLoading ? (
        <NoResults product={title} />
      ) : (
        <>
          <h2>{title}</h2>
          <p className={classes.PageContent__quantity}>
            {`${products.length} model${products.length === 1 ? '' : 's'}`}
          </p>
          <div className={classes['PageContent__dropdown-wrapper']}>
            <DropDown
              title="Sort by"
              options={SORT_BY}
              init="price"
              changeParams={handleSortByChange}
            />
            <DropDown
              title="Items on page"
              options={FILTER_BY}
              init="16"
              changeParams={handlePerPageChange}
            />
          </div>
        </>
      )}

      {isLoading ? <Loader /> : <ProductsList products={preparedList} />}

      {products && (
        <div className={classes.PageContent__pagination}>
          <Pagination
            perPage={Number(perPage) ? +perPage : products.length}
            length={products.length}
            page={+currentPage}
            changePage={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
