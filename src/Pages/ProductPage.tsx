/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../store/ProductsContext';
import { Dropdown } from '../elements/Dropdown/Dropdown';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Loader } from '../elements/Loader/Loader';
import { NoSearchResults } from '../elements/NoSearchResults/NoSearchResults';
import './Page.scss';
import { getProductsByKey, getProductsByQuery } from '../helpers/utils/getFilteredProducts';
import { ProductType } from '../helpers/types/ProductType';
import { getProductsByCategory } from '../helpers/utils/api';
import { Sort, getSortedProducts } from '../helpers/utils/getSortedProducts';
import { namedSortOptions, pageSortOptions } from '../helpers/utils/constants';

type Props = {
  product: string;
};

export const ProductPage: React.FC<Props> = ({ product }) => {
  const { query } = useContext(ProductsContext);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(Sort.age);

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
  const productCapitalName = product[0].toUpperCase() + product.slice(1);

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

  const handlePagesClick = () => {};

  return (
    <main className="page">
      <Breadcrumbs page={productCapitalName} />
      <h1 className="page__title title title--h1">
        {product === 'phones' ? `Mobile ${product}` : productCapitalName}
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {visibleProducts.length === 0 ? (
            <NoSearchResults />
          ) : (
            <>
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

              <ProductsList products={visibleProducts} />
            </>
          )}
        </>
      )}
    </main>
  );
};
