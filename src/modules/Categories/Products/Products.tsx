/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DSContext } from '../../../context/DSContext';
import { MainContext } from '../../../context/MainContext';
import { ProductsContext } from '../../../context/ProductsContext';
import { SearchContext } from '../../../context/SearchContext';
import { DropdownSelection } from './components/DropdownSelection';
import { Pagination } from './components/Pagination';
import { ProductsItems } from './components/ProductsItems';
import { PerPage } from './enums/PerPage';
import { SortBy } from './enums/SortBy';
import styles from './Products.module.scss';

interface Props {
  query: 'phones' | 'tablets' | 'accessories';
}

export const Products: React.FC<Props> = ({ query }) => {
  // #region context

  const { scrollToTopHandler, setIsFooterAbsPos } = useContext(MainContext);
  const { products } = useContext(ProductsContext);
  const {
    pageNumber,
    searchPageParam,
    PAGE_PARAM,
    setPageNumber,

    SORT_TITLE,
    sortBy,
    searchSortParam,
    SORT_PARAM,
    setSortBy,

    PER_PAGE_TITLE,
    perPage,
    searchPerPageParam,
    PER_PAGE_PARAM,
    setPerPage,
  } = useContext(DSContext);
  const { getSearchWith } = useContext(SearchContext);

  // #endregion
  // #region variables

  const capitalizedQuery = query[0].toUpperCase() + query.slice(1);
  const title = query === 'phones' ? 'Mobile phones' : capitalizedQuery;
  const perPageNumber = +perPage;

  // #region products

  const filteredProducts = useMemo(
    () => products.filter(product => product.category === query),
    [products, query],
  );

  const sortedProducts = useMemo(
    () =>
      filteredProducts.toSorted((productA, productB) => {
        if (sortBy === SortBy.alphabetically) {
          return productA.name.localeCompare(productB.name);
        }

        if (sortBy === SortBy.cheapest) {
          return productA.fullPrice - productB.fullPrice;
        }

        return (productB.year as number) - (productA.year as number);
      }),
    [filteredProducts, sortBy],
  );

  // #endregion

  const pagesLength = Math.ceil(
    filteredProducts.length / (perPageNumber || +PerPage._16),
  );

  const pageNumbers = Array.from({ length: pagesLength }, (_, i) => i + 1);

  const slicedSortedProducts = sortedProducts.slice(
    (pageNumber - 1) * perPageNumber,
    pageNumber * perPageNumber,
  );

  const resultingProducts =
    perPage === PerPage.all ? sortedProducts : slicedSortedProducts;

  // #endregion
  // #region handlers

  const handleSetSortBy = (value: SortBy | '') => setSortBy(value);

  const handleSetPerPage = (value: PerPage | '') => setPerPage(value);

  // #endregion
  // #region useEffects

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const footerAbsPosCondition = filteredProducts.length === 0;

  useEffect(() => scrollToTopHandler(0), []);

  useEffect(() => {
    if (!searchPageParam) {
      setPageNumber(1);
    } else {
      setPageNumber(+searchPageParam);
    }
  }, [pathname, searchPageParam]);

  useEffect(() => {
    if (
      searchPageParam &&
      pageNumbers.length &&
      !pageNumbers.includes(+searchPageParam)
    ) {
      navigate({ search: getSearchWith({ [PAGE_PARAM]: '1' }) });
    }
  }, [pagesLength, searchPageParam]);

  useEffect(() => {
    if (searchPageParam && perPage === PerPage.all) {
      navigate({ search: getSearchWith({ [PAGE_PARAM]: null }) });
    }
  }, [searchPageParam, perPage]);

  useEffect(() => {
    if (footerAbsPosCondition) {
      setIsFooterAbsPos(true);
    } else {
      setIsFooterAbsPos(false);
    }
  }, [footerAbsPosCondition]);

  // #endregion
  // #region markups

  const noProductsMarkup = (
    <h2 className={styles.title}>There are no {query} yet</h2>
  );

  const availableProductsMarkup = (
    <>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.subtitle}>{filteredProducts.length} models</h3>
      <div className={styles['ds-wrapper']}>
        <DropdownSelection<SortBy>
          title={SORT_TITLE}
          buttonValue={sortBy}
          searchParam={searchSortParam}
          searchParamStr={SORT_PARAM}
          enumValues={Object.values(SortBy)}
          defaultEnumValue={SortBy.alphabetically}
          setButtonValue={handleSetSortBy}
        />
        <DropdownSelection<PerPage>
          title={PER_PAGE_TITLE}
          buttonValue={perPage}
          searchParam={searchPerPageParam}
          searchParamStr={PER_PAGE_PARAM}
          enumValues={Object.values(PerPage)}
          defaultEnumValue={PerPage._16}
          setButtonValue={handleSetPerPage}
        />
      </div>
      <ProductsItems products={resultingProducts} />
      {perPage !== PerPage.all && <Pagination pageNumbers={pageNumbers} />}
    </>
  );

  // #endregion

  return (
    <section className={styles.products}>
      {footerAbsPosCondition ? noProductsMarkup : availableProductsMarkup}
    </section>
  );
};
