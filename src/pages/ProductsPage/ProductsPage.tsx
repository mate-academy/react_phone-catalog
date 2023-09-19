import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { ProductType } from '../../types/ProductType';
import { getSearchWith } from '../../helpers/searchHelper';
import { sortOptions } from '../../helpers/sortOptions';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { DropDown } from '../../components/DropDown/DropDown';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../../components/Pagination/Pagination';
import { NoSearchResults }
  from '../../components/NoSearchResults/NoSearchResults';
import { NoResults } from '../../components/NoResults/NoResults';

import './ProductsPage.scss';

type Props = {
  products: Product[];
};

const smallestPageSize = 4;

export const ProductsPage: React.FC<Props> = React.memo((
  { products },
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const sortBy = searchParams.get('sortBy') || 'age';
  const pageSize = searchParams.get('pageSize') || smallestPageSize;
  const currentPage = searchParams.get('currentPage') || 1;

  const { category } = useParams();

  let title = '';

  if (category) {
    const validCategories = ['phones', 'tablets', 'accessories'];

    if (validCategories.includes(category)) {
      switch (category) {
        case 'phones':
          title = 'Mobile phones';
          break;
        case 'tablets':
          title = 'Tablets';
          break;
        case 'accessories':
          title = 'Accessories';
          break;
        default:
          title = 'Page';
      }
    } else {
      title = 'Page';
    }
  }

  const categoryProducts = useMemo(() => {
    const validCategories = ['phones', 'tablets', 'accessories'];

    if (category && validCategories.includes(category)) {
      return products.filter((product) => {
        switch (category) {
          case 'phones':
            return product.category === ProductType.phone;
          case 'tablets':
            return product.category === ProductType.tablet;
          case 'accessories':
            return product.category === ProductType.accessory;
          default:
            return false;
        }
      });
    }

    return [];
  }, [products, category]);

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
    return categoryProducts.filter(product => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedName = product.name.toLowerCase().trim();

      return normalizedName.includes(normalizedQuery);
    });
  }, [categoryProducts, query]);

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
        productsCopy.sort((a, b) => b.year - a.year);
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
  const pageSizes = [smallestPageSize, 8, 16, productsLength];
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
