/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsContext } from '../store/ProductsContext';
import { Dropdown } from '../elements/Dropdown/Dropdown';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Loader } from '../elements/Loader/Loader';
import './Page.scss';
import { getProductsByKey, getProductsByQuery } from '../helpers/utils/getFilteredProducts';
import { ProductType } from '../helpers/types/ProductType';
import { getProductsByCategory } from '../helpers/utils/api';
import { Sort, getSortedProducts } from '../helpers/utils/getSortedProducts';
import { namedSortOptions, pageSortOptions } from '../helpers/utils/constants';
import { Pagination } from '../elements/Pagination/Pagination';
import { capitalize } from '../helpers/utils/capitalize';
import { Fail } from '../elements/Empty/Fail';

type Props = {
  product: string;
};

export const ProductPage: React.FC<Props> = ({ product }) => {
  const { query } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(Sort.age);
  const [perPage, setPerPage] = useState('4');

  const IndexOfFirstVisibleItem = ((+page - 1) * +perPage) + 1;

  useEffect(() => {
    setIsLoading(true);

    getProductsByCategory(product)
      .then(setProducts)
      .finally(() => setIsLoading(false));
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

  return (
    <main className="page">
      <Breadcrumbs page={capitalize(product)} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {visibleProducts.length === 0 ? (
            <Fail title={`${capitalize(product)} not found`} />
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
                />
                <Dropdown
                  title="Items on page"
                  queryName="perPage"
                  sortData={pageSortOptions}
                  onClick={handlePagesClick}
                />
              </div>

              <ProductsList products={visibleProductsOnPage} />

              <Pagination
                products={visibleProducts}
              />
            </>
          )}
        </>
      )}
    </main>
  );
};
