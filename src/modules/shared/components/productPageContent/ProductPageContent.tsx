/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react';

import styles from './ProductPageContent.module.scss';
import { MainLayout } from '../../../../layout/MainLayout';
import { ProductsList } from '../productsList';
import { useAppSelector } from '../../../../app/hooks';
import { ProductsPageTop } from '../productsPageTop';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../pagination';
import { sortProducts } from '../../../../utils/sortProducts';
import { changeSearchParams } from '../../../../utils/changeSearchParams';
import { ProductPageTop } from '../../../../types/ProductPageTop';
import { Loader } from '../loader';

type Props = {
  pageTop: ProductPageTop;
  productsName: 'phones' | 'accessories' | 'tablets';
};

export const ProductPageContent: React.FC<Props> = ({
  pageTop,
  productsName,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, hasError } = useAppSelector(s => s.products);

  const sortBy = searchParams.get('sortBy');
  const productsOnPage = Number(searchParams.get('perPage') || 'all');
  const page = Number(searchParams.get('page') || '1');
  const firstRender = useRef(true);

  const sortedProducts = useMemo(() => {
    const allProduct = products.filter(p => p.category === productsName);

    return sortProducts(allProduct, sortBy);
  }, [sortBy, products]);

  const visibleProducts = useMemo(() => {
    if (isNaN(productsOnPage) || isNaN(page)) {
      return sortedProducts;
    }

    const lastIndex = page * productsOnPage;
    const firstIndex = lastIndex - productsOnPage;

    return sortedProducts.slice(firstIndex, lastIndex);
  }, [page, productsOnPage, sortedProducts]);

  const countPages = Math.ceil(sortedProducts.length / productsOnPage);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    setSearchParams(changeSearchParams(searchParams, { page: null }));
  }, [sortBy, productsOnPage]);

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  } else if (hasError) {
    return (
      <MainLayout>
        <h1>Something went wrong</h1>
      </MainLayout>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <MainLayout>
        <h1>There are no {productsName}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.mainContent}>
        <ProductsPageTop
          page={pageTop.page}
          title={pageTop.title}
          countModels={sortedProducts.length}
        />

        <ProductsList products={visibleProducts} />

        {!isNaN(countPages) && countPages > 1 && (
          <Pagination countPages={countPages} />
        )}
      </div>
    </MainLayout>
  );
};
