import React, { useContext, useMemo, useEffect, useState } from 'react';
import './ProductPage.scss';
import { Dropdown } from '../shared/Dropdown';
import { Pagination } from '../shared/Pagination';
import { useParams, useSearchParams } from 'react-router-dom';
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

export const ProductPage: React.FC = () => {
  const { products } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // const defaultSortBy = 'Newest';
  // const defaultItemsPerPage = 'All';

  const sortBy = searchParams.get('sort') || 'Newest';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const currentPage = Number(searchParams.get('page')) || 1;
  const queryParam = searchParams.get('query') || '';

  // const { sort = defaultSortBy, perPage = defaultItemsPerPage, page = '1', query = '' } = Object.fromEntries(searchParams);

  const { productsType } = useParams<{ productsType: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryProducts = useMemo(() => {
    return products.filter(product => product.category === productsType);
  }, [products, productsType]);

  const visibleProducts = useMemo(() => {
    return getPreparedProducts(categoryProducts, {
      sortBy,
      query: queryParam,
    });
  }, [queryParam, categoryProducts, sortBy]);

  const countVisibleProducts = visibleProducts.length;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [productsType]);

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

  return (
    <div className="productPage">
      {isLoading && <Loader />}
      {error && (
        <div className="productPage__error">
          <p>{error}</p>
          <button onClick={() => setIsLoading(true)}>Reload</button>
        </div>
      )}
      {!isLoading && !error && (
        <>
          <Breadcrumbs productType={productsType!} />

          <h1 className="productPage__title">
            {productsType &&
              productsType.charAt(0).toUpperCase() + productsType.slice(1)}
          </h1>

          <span className="productPage__description">
            {`${countVisibleProducts} ${
              countVisibleProducts === 1 ? 'model' : 'models'
            }`}
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
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
