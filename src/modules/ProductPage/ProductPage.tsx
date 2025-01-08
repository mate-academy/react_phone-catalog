import React, { useContext, useEffect, useState } from 'react';
import './ProductPage.scss';
import { Dropdown } from '../shared/Dropdown';
import { Pagination } from '../shared/Pagination';
import { useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../../store/GlobalContext';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductsList } from '../shared/ProductsList';
import { Loader } from '../shared/Loader';
import { Product } from '../../types/Product';
import { getSearchWith } from '../../utils/searchHelper';

export type SearchParams = {
  [key: string]: string | string[] | null;
};

const getPreparedProducts = (
  products: Product[],
  { sortBy, query }: { sortBy: string; query: string },
): Product[] => {
  let filteredProducts = [...products];

  if (query) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  switch (sortBy) {
    case 'Newest':
      return filteredProducts.sort((a, b) => b.year - a.year);
    case 'Alphabetically':
      return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'Cheapest':
      return filteredProducts.sort((a, b) => a.fullPrice - b.fullPrice);
    default:
      return filteredProducts;
  }
};

type Props = {
  category: string;
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const { allProducts } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'Newest';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const currentPage = Number(searchParams.get('page')) || 1;
  const queryParam = searchParams.get('query') || '';

  const categoryProducts = allProducts.filter(
    product => product.category === category,
  );

  const visibleProducts = getPreparedProducts(categoryProducts, {
    sortBy,
    query: queryParam,
  });

  const countVisibleProducts = visibleProducts.length;

  const handleSortChange = (value: string) => {
    const updatedParams = value === 'Newest' ? { sort: null } : { sort: value };

    setSearchParams(getSearchWith(searchParams, updatedParams));
  };

  const handleItemsPerPageChange = (value: string) => {
    const updatedParams =
      value === 'All'
        ? { perPage: null, page: null }
        : { perPage: value, page: '1' };

    setSearchParams(getSearchWith(searchParams, updatedParams));
  };

  const handlePageChange = (page: number) => {
    const updatedParams = page === 1 ? { page: null } : { page: String(page) };

    setSearchParams(getSearchWith(searchParams, updatedParams));
  };

  const totalPages =
    itemsPerPage === 'All'
      ? 1
      : Math.ceil(countVisibleProducts / +itemsPerPage);

  const startIndex = (currentPage - 1) * +itemsPerPage;
  const currentItems =
    itemsPerPage === 'All'
      ? visibleProducts
      : visibleProducts.slice(startIndex, startIndex + +itemsPerPage);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // const timer = setTimeout(() => {
    try {
      if (!allProducts || allProducts.length === 0) {
        throw new Error('Failed to load products');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
    // }, 500);

    // return () => clearTimeout(timer);
  }, [category, allProducts]);

  return (
    <div className="productPage">
      {isLoading && <Loader />}

      {!isLoading && error && (
        <div className="productPage__error">
          <p>Something went wrong. Please try again.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )}

      {!isLoading && !error && visibleProducts.length === 0 && !queryParam && (
        <div className="productPage__no-products">
          <p>There are no {category} yet.</p>
        </div>
      )}

      {!isLoading && !error && visibleProducts.length === 0 && queryParam && (
        <div className="productPage__no-products">
          <p>Product was not found</p>
        </div>
      )}

      {!isLoading && !error && visibleProducts.length > 0 && (
        <>
          <Breadcrumbs productType={category!} />

          <h1 className="productPage__title">
            {category &&
              `${category.charAt(0).toUpperCase() + category.slice(1)} page`}
          </h1>

          <span className="productPage__description">
            {`${countVisibleProducts} model${countVisibleProducts !== 1 ? 's' : ''}`}
          </span>

          <div className="productPage__dropdown">
            <div className="productPage__dropdown--sortBy">
              <Dropdown
                label="Sort by"
                selected={sortBy}
                options={['Newest', 'Alphabetically', 'Cheapest']}
                onChange={handleSortChange}
              />
            </div>
            <div className="productPage__dropdown--itemsPerPage">
              <Dropdown
                label="Items on page"
                selected={itemsPerPage}
                options={['4', '8', '16', 'All']}
                onChange={handleItemsPerPageChange}
              />
            </div>
          </div>

          <ProductsList products={currentItems} displayType={'with-discount'} />

          {itemsPerPage !== 'All' && totalPages > 1 && (
            <Pagination
              total={countVisibleProducts}
              perPage={+itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
