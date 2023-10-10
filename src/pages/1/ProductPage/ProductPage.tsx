import './ProductPage.scss';
import React, { useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Phone } from '../../../types/Phone';
import { ProductType } from '../../../types/ProductType';
import { getSearchWith } from '../../../helpers/getSearch';
import { BreadCrumbs } from '../../../components/BreadCrumbs/BreadCrumbs';
import { DropDown } from '../../../components/DropDown/DropDown';
import { sortOptions } from '../../../helpers/sortoptions';
import { ProductCard } from '../../../components/PhoneCard/PhoneCard';
import { Pagination } from '../../../components/Pagination/Pagination';
import { NoResult } from '../../../components/NoResult/NoResult';

type Props = {
  products: Phone[],
};

export const ProductPage: React.FC<Props> = React.memo(({ products }) => {
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
    </div>
  );
});
