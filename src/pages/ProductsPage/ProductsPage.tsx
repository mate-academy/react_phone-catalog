import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { getSearchWith } from '../../helpers/searchHelper';
import { sortOptions } from '../../helpers/sortOptions';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { DropDown } from '../../components/DropDown/DropDown';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../../components/Pagination/Pagination';
import { NoSearchResults }
  from '../../components/NoSearchResults/NoSearchResults';

import './ProductsPage.scss';
import { NoResults } from '../../components/NoResults/NoResults';

type Props = {
  products: Product[];
  title: string;
};

const smallestPageSize = 4;

export const ProductsPage: React.FC<Props> = React.memo((
  { products, title },
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const sortBy = searchParams.get('sortBy') || 'age';
  const pageSize = searchParams.get('pageSize') || smallestPageSize;
  const currentPage = searchParams.get('currentPage') || 1;

  const handleSortChange = (newValue: string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          sortBy: newValue || null,
          currentPage: '1' || null,
        },
      ),
    );
  };

  const handlePageSizeChange = (
    newValue: string,
  ) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          pageSize: newValue || null,
          currentPage: '1',
        },
      ),
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedName = product.name.toLowerCase().trim();

      return normalizedName.includes(normalizedQuery);
    });
  }, [products, query]);

  const sortedProducts = useMemo(() => {
    const productsCopy = [...filteredProducts];

    switch (sortBy) {
      case 'name':
        productsCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'price':
        productsCopy.sort((a, b) => a.price - b.price);
        break;

      case 'age':
      default:
        productsCopy.sort((a, b) => b.age - a.age);
        break;
    }

    return productsCopy;
  }, [sortBy, filteredProducts]);

  const startIndex = (+currentPage - 1) * +pageSize;
  const endIndex = startIndex + +pageSize;
  const visibleProducts = useMemo(() => {
    return sortedProducts.slice(startIndex, +endIndex);
  }, [sortedProducts, startIndex, endIndex]);

  const productsLength = sortedProducts.length;
  const pageSizes = [smallestPageSize, 8, productsLength]; // add 16 when will be more phones on API
  const showPagination = productsLength > smallestPageSize
    && +pageSize !== +productsLength;

  return (
    <div className="ProductsPage">
      <div className="container">
        {!visibleProducts.length && !query && (
          <>
            <Breadcrumbs />
            <NoResults category={title} />
          </>
        )}

        {!visibleProducts.length && query ? (
          <NoSearchResults />
        ) : !!visibleProducts.length && (
          <div className="ProductsPage__content">
            <Breadcrumbs />

            <h1 className="ProductsPage__title">{title}</h1>

            <h3 className="ProductsPage__subtitle">{`${productsLength} models`}</h3>

            <div className="ProductsPage__filters">
              <div className="ProductsPage__filter">
                <div
                  className="ProductsPage__label"
                >
                  Sort by
                </div>
                <DropDown
                  options={sortOptions}
                  value={sortBy}
                  onChange={handleSortChange}
                />
              </div>
              <div className="ProductsPage__filter">
                <div
                  className="ProductsPage__label"
                >
                  Items on page
                </div>
                <DropDown
                  options={pageSizes.map((size) => ({
                    value: String(size),
                    label: size === productsLength ? 'All' : String(size),
                  }))}
                  value={String(pageSize)}
                  onChange={handlePageSizeChange}
                />
              </div>
            </div>

            <div className="ProductsList" data-cy="productList">
              {visibleProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>

            {showPagination && productsLength > 0 && (
              <Pagination
                currentPage={+currentPage}
                pageSize={+pageSize}
                productsLength={productsLength}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
});
