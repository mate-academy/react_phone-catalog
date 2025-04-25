import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useLoadProducts } from '../../hooks/useLoadProducts';
import { SortOptions } from '../../enums/SortOptions';

import { UseSortedProducts } from '../../components/helpers/UseSortedProducts';
import { getTitle } from '../../components/helpers/GetTitle';
import { BreadCrumbs } from '../../components/BreadCrumps/BreadCrumbs';
import { SortSelect } from '../../components/SortSelect/SortSelect';
import { PerPageSelect } from '../../components/PerPageSelect/PerPageSelect';
import { ProductList } from '../../components/ProductList/ProductList';
import { Pagination } from '../../components/Pagination/Pagination';

import style from './ProductPage.module.scss';

interface Props {
  category: string;
}

export const ProductPage: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearcParams] = useSearchParams();
  const loadProducts = useLoadProducts();
  const defaultPage = 1;
  const defaultPerPage = 'All';
  const defaultSort = SortOptions.Newest;
  const currentPage = Number(searchParams.get('page')) || defaultPage;
  const perPage = searchParams.get('perPage') || defaultPerPage;
  const sort = searchParams.get('sort') || 'year';

  const products = UseSortedProducts(sort, category);

  const totalProducts = products.length;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const updateParams = (newParams: {
    page?: number;
    perPage?: string;
    sort?: string;
  }) => {
    const updatedParams: { page?: string; perPage?: string; sort?: string } =
      {};

    if (newParams.page && newParams.page !== defaultPage) {
      updatedParams.page = newParams.page.toString();
    }

    if (newParams.perPage && newParams.perPage !== defaultPerPage) {
      updatedParams.perPage = newParams.perPage;
    } else if (!newParams.perPage) {
      updatedParams.perPage = perPage;
    }

    if (newParams.sort && newParams.sort !== defaultSort) {
      updatedParams.sort = newParams.sort;
    } else if (!newParams.sort) {
      updatedParams.sort = sort;
    }

    setSearcParams(updatedParams);
  };

  const itemsPerPage =
    perPage === 'All' ? totalProducts : Number(perPage) || totalProducts;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    updateParams({ page, perPage, sort });
  };

  const title = getTitle(category);

  return (
    <div className={style.product_page}>
      <BreadCrumbs className={style.product_page__breadCrumbs} />

      <div className={style.product_page__content}>
        <h1 className={style.product_page__content_title}>{title}</h1>

        <div className={style.product_page__content_total}>
          {totalProducts} items
        </div>
      </div>

      <div className={style.product_page__selectors}>
        <SortSelect sort={sort} updateParams={updateParams} />
        <PerPageSelect perPage={perPage} updateParams={updateParams} />
      </div>

      <ProductList products={currentProducts} />

      {perPage !== 'All' && Number(perPage) < totalProducts && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={goToPage}
          className={style.produc_page__pagination}
        />
      )}
    </div>
  );
};
