import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Phone } from '../types/Phone';
import { ProductType } from '../types/ProductType';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { NoResult } from '../components/NoResult';
import { DropDown } from '../components/DropDown';
import { ProductCard } from '../components/ProductCard';
// eslint-disable-next-line import/no-cycle
import { Pagination } from '../components/Pagination';
import { sortOptions } from '../helpers/sortOptions';
import './PhonesPage.scss';

type Props = {
  products: Phone[],
};

export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);

      value.forEach((part) => {
        newParams.append(key, part);
      });
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}

export const PhonesPage: React.FC<Props> = React.memo(({ products }) => {
  const smallestPageSize = 4;

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || 'age';
  const pageSize = searchParams.get('pageSize') || smallestPageSize;
  const currentPage = searchParams.get('currentPage') || 1;
  const { category } = useParams();

  let title = '';

  if (category) {
    const categories = ['phones', 'tablets', 'accessories'];

    if (categories.includes(category)) {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      title = 'Page';
    }
  }

  const categoryProducts = useMemo(() => {
    const validCategories = ['phones', 'tablets', 'accessories'];

    if (category && validCategories.includes(category)) {
      return products.filter((product) => {
        switch (category) {
          case 'phones':
            return product.category === ProductType.Phone;
          case 'tablets':
            return product.category === ProductType.Tablet;
          case 'accessories':
            return product.category === ProductType.Accessory;
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

  const handlePageSizeChange = (newValue: string) => {
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
        productsCopy.sort((a, b) => b.year - a.year);
        break;

      default:
        productsCopy.sort((a, b) => b.year - a.year);
        break;
    }

    return productsCopy;
  }, [sortBy, filteredProducts]);

  const startIndex = (+currentPage - 1) * +pageSize;
  const lastIndex = startIndex + +pageSize;
  const visibleProducts = useMemo(() => {
    return sortedProducts.slice(startIndex, +lastIndex);
  }, [sortedProducts, startIndex, lastIndex]);
  const productsLength = sortedProducts.length;
  const pageSizes = [smallestPageSize, 8, 16, productsLength];
  const showPagination = productsLength > smallestPageSize
    && +pageSize !== +productsLength;

  return (
    <div className="productPage">
      <div className="container">
        {!visibleProducts.length && !query && (
          <>
            <BreadCrumbs />
            <NoResult title={title} />
          </>
        )}

        {!visibleProducts.length && query ? (
          <p className="productPage__empty">No Results</p>
        ) : !!visibleProducts.length && (
          <div className="productPage__content">
            <BreadCrumbs />
            <h1 className="productPage__title">{title}</h1>
            <h3 className="productPage__subtitle">{`${productsLength} models`}</h3>

            <div className="productPage__filters">
              <div className="productPage__filter">
                <div className="productPage__label">
                  Sort by
                </div>

                <DropDown
                  options={sortOptions}
                  value={sortBy}
                  onChange={handleSortChange}
                />
              </div>

              <div className="productPage__filter">
                <div className="productPage__label">
                  Items on page
                </div>

                <DropDown
                  options={pageSizes.map((page) => ({
                    value: String(page),
                    label: page === productsLength ? 'All' : String(page),
                  }))}
                  value={String(pageSize)}
                  onChange={handlePageSizeChange}
                />
              </div>
            </div>

            <div className="productPage__list">
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
      {/* <Outlet /> */}
    </div>
  );
});
