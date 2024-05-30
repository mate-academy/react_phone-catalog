import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { getPagination } from './helpers/getPagination';

type Props = {
  products: Product[];
  title: string;
  dropdown?: boolean;
};

export const PageContent: React.FC<Props> = ({
  products,
  title,
  dropdown = true,
}) => {
  const { isLoading } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const currentPage = searchParams.get('page') || '';

  const elementRef = useRef<HTMLDivElement | null>(null);
  const [range, setRange] = useState<(string | number)[]>([]);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const width = elementRef.current.offsetWidth;
    const length = perPage ? Math.ceil(products.length / +perPage) : null;

    const currentRange = getPagination(length, width, +currentPage);

    setRange(currentRange);
  }, [products, currentPage, perPage]);

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
    const width = Number(perPage) ? +perPage : products.length;

    return list.slice((pageNumber - 1) * width, pageNumber * width);
  }, [products, perPage, currentPage, sortBy]);

  return (
    <div className={classes.PageContent} ref={elementRef}>
      <Breadcrumbs />

      {!products.length && !isLoading ? (
        <NoResults product={title} />
      ) : (
        <>
          <h1>{title}</h1>
          <p className={classes.PageContent__quantity}>
            {`${products.length} model${products.length === 1 ? '' : 's'}`}
          </p>

          {dropdown && (
            <div className={classes['PageContent__dropdown-wrapper']}>
              <DropDown
                title="Sort by"
                options={SORT_BY}
                init="name"
                changeParams={handleSortByChange}
              />
              <DropDown
                title="Items on page"
                options={FILTER_BY}
                init="all"
                changeParams={handlePerPageChange}
              />
            </div>
          )}
        </>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductsList products={preparedList} />

          {range && range?.length > 1 && (
            <div className={classes.PageContent__pagination}>
              <Pagination
                range={range}
                currentPage={+currentPage}
                changePage={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
