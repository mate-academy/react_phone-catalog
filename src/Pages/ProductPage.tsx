/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../elements/Dropdown/Dropdown';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Loader } from '../elements/Loader/Loader';
import './Page.scss';
import { getProductsByKey, getProductsByQuery } from '../helpers/getFunctions/getFilteredProducts';
import { ProductType } from '../helpers/types/ProductType';
import { getProductsByCategory } from '../api/api';
import { Sort, getSortedProducts } from '../helpers/getFunctions/getSortedProducts';
import { namedSortOptions, pageSortOptions } from '../helpers/utils/constants';
import { Pagination } from '../elements/Pagination/Pagination';
import { capitalize } from '../helpers/utils/capitalize';
import { Fail } from '../elements/Empty/Fail';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSearchWith } from '../helpers/getFunctions/getSearch';
import { setQuery } from '../features/querySlice';

type Props = {
  product: string;
};

export const ProductPage: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.query);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(Sort.age);
  const [perPage, setPerPage] = useState('8');

  const IndexOfFirstVisibleItem = ((+page - 1) * +perPage) + 1;

  useEffect(() => {
    setIsLoading(true);

    getProductsByCategory(product)
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [product]);

  useEffect(() => {
    dispatch(setQuery(''));
    const search = getSearchWith({ query: null }, searchParams);

    setSearchParams(search);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const visibleProducts = getSortedProducts(getProductsByQuery(
    getProductsByKey(products, 'category', product),
    query,
  ), sortBy);

  const visibleProductsOnPage = visibleProducts.slice(IndexOfFirstVisibleItem, IndexOfFirstVisibleItem + (+perPage));

  const handleSortClick = (key?: Sort) => {
    if (!key) {
      return;
    }

    if (key === 'year') {
      setSortBy(Sort.age);
    } else {
      setSortBy(key);
    }
  };

  const handlePagesClick = (key?: string) => {
    if (!key) {
      return;
    }

    if (key === 'All') {
      setPerPage(products.length.toString());
    } else {
      setPerPage(key);
    }
  };

  if (visibleProducts.length === 0 && !query.length && !isLoading) {
    return (<Fail text title={`Sorry! All ${product} are sold out`} />);
  }

  return (
    <main className="page">
      <Breadcrumbs page={capitalize(product)} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {visibleProducts.length === 0 ? (
            <Fail noBck title={`${capitalize(product)} not found`} />
          ) : (
            <>
              <h1 className="page__title-h1 page__title-h1--product">
                {product === 'phones' ? `Mobile ${product}` : capitalize(product)}
              </h1>

              <p className="page__prodCount">
                {visibleProducts.length > 1
                  ? `${visibleProducts.length} models`
                  : `${visibleProducts.length} model`}
              </p>

              <div className="page__dropdowns">
                <Dropdown
                  title="Sort by"
                  queryName="sortBy"
                  sortData={namedSortOptions}
                  onClick={handleSortClick}
                  defaultVal="Newest"
                />
                <Dropdown
                  title="Items on page"
                  queryName="perPage"
                  sortData={pageSortOptions}
                  onClick={handlePagesClick}
                  defaultVal="8"
                />
              </div>

              <ProductsList products={visibleProductsOnPage} />

              {+perPage <= 16 && (
                <Pagination
                  products={visibleProducts}
                />
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};
