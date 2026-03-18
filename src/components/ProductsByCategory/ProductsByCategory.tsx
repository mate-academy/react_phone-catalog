import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../ProductsList';
import { SearchParamSelect } from '../SearchParamSelect';
import { Pagination } from '../Pagination';
import { useTranslate } from '../../hooks/useTranslate';
import { getSortedProducts } from '../../utils/getSortedProducts';
import { setParam } from '../../utils/setParam';
import { scrollToTop } from '../../utils/scrollToTop';
import {
  ITEMS_ON_PAGE_OPTIONS,
  SORT_BY,
  SORT_BY_OPTIONS,
} from '../../constants/Products/sortingBy';
import {
  INIT_CURRENT_PAGE,
  SEARCH_PARAMS,
} from '../../constants/Products/byCategory';
import { CategoryTitle } from '../../types/ProductCategory';
import { Product } from '../../types/Product';
import style from './ProductsByCategory.module.scss';

type Props = {
  title: CategoryTitle;
  products: Product[];
};

export const ProductsByCategory: React.FC<Props> = ({ products, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const t = useTranslate();

  const currentPage =
    Number(searchParams.get(SEARCH_PARAMS.page)) || INIT_CURRENT_PAGE;
  const sortBy = searchParams.get(SEARCH_PARAMS.sort) || SORT_BY.age;

  const sortedProductList = useMemo(
    () => getSortedProducts(products, sortBy),
    [products, sortBy],
  );

  const totalItems = sortedProductList.length;
  const itemsPerPage =
    Number(searchParams.get(SEARCH_PARAMS.perPage)) || totalItems;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return sortedProductList.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProductList, currentPage, itemsPerPage]);

  const setCurrentPage = (page: number) => {
    if (page === currentPage) {
      return;
    }

    const newParams = setParam(searchParams, SEARCH_PARAMS.page, String(page));

    setSearchParams(newParams);
    scrollToTop();
  };

  const showPagination = totalItems > itemsPerPage;

  return (
    <div className={style.productsContainer}>
      <h1 className="pageTitle">{title}</h1>

      <p className={'itemsQty'}>
        {totalItems} {t('byCategory.models', { count: totalItems })}
      </p>

      <div className={style.selectContent}>
        <div className={style.sortBySelect}>
          <SearchParamSelect
            options={SORT_BY_OPTIONS}
            title={t('sort.by')}
            searchParamKey={SEARCH_PARAMS.sort}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className={style.itemsOnPageSelect}>
          <SearchParamSelect
            options={ITEMS_ON_PAGE_OPTIONS}
            title={t('sort.items')}
            searchParamKey={SEARCH_PARAMS.perPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <div className={style.productsListSection}>
        <ProductsList data={currentItems} />
      </div>

      {showPagination && (
        <div className={style.paginationSection}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
