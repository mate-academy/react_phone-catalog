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

  const sortBy = searchParams.get('sort') || 'Newest';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const currentPage = Number(searchParams.get('page')) || 1;
  const queryParam = searchParams.get('query') || '';

  const { productsType } = useParams<{ productsType: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const validProductTypes = ['phones', 'tablets', 'accessories'];

  useEffect(() => {
    if (productsType && !validProductTypes.includes(productsType)) {
      setError('Invalid product type!');
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setError(null);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [productsType, products]);

  const categoryProducts = useMemo(() => {
    if (productsType && validProductTypes.includes(productsType)) {
      return products.filter(product => product.category === productsType);
    }

    return [];
  }, [products, productsType]);

  const visibleProducts = useMemo(() => {
    return getPreparedProducts(categoryProducts, {
      sortBy,
      query: queryParam,
    });
  }, [queryParam, categoryProducts, sortBy]);

  const countVisibleProducts = visibleProducts.length;

  const handleReload = () => {
    setIsLoading(true);
    setError(null);

    if (productsType && !validProductTypes.includes(productsType)) {
      setError('Invalid product type!');
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="productPage">
      {isLoading && <Loader />}
      {error && (
        <div className="productPage__error">
          <p>{error}</p>
          <button onClick={handleReload}>Reload</button>
        </div>
      )}

      {!categoryProducts.length && !error && !isLoading && (
        <div className="productPage__empty-content">
          <p>{`There are no ${productsType} yet`}</p>
          <button onClick={handleReload}>Reload</button>
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
