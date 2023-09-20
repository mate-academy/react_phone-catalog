import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import {
  getPerPageNumber,
  getProductsFromQuery,
  getVisibleProducts,
  parseStringToNumber,
  getSortedProducts,
  sortingOptions,
  paginationOptions,
  findAppliedValueName,
} from '../../helpers/utils';
import { Dropdown } from '../Dropdown';
import { Pagination } from '../Pagination';
import { NoSearchResults } from '../NoSearchResults';

import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);

  const appliedQuery = searchParams.get('query') || '';
  const appliedSortBy = searchParams.get('sort') || '';
  const appliedPerPage = searchParams.get('perPage') || '';
  const appliedPage = searchParams.get('page') || '';

  const [query, setQuery] = useState(appliedQuery);
  const [sortBy, setSortBy] = useState(appliedSortBy);
  const [perPage, setPerPage] = useState(appliedPerPage);
  const [page, setPage] = useState(appliedPage);

  const perPageNumber = getPerPageNumber(perPage, products.length);
  const pageNumber = parseStringToNumber(page, 1);

  const applySearchParam = (newValue: string, key: string) => {
    if (newValue) {
      searchParams.set(key, newValue);
    } else {
      searchParams.delete(key);
    }

    navigate({
      pathname,
      search: searchParams.toString(),
    });
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    setQuery(appliedQuery);
    setPage('1');
    applySearchParam('', 'page');
  }, [appliedQuery]);

  const sortedProducts = getSortedProducts(products, sortBy);
  const filteredProducts = getProductsFromQuery(sortedProducts, query);
  const visibleProducts = getVisibleProducts(
    filteredProducts,
    perPageNumber,
    pageNumber,
  );

  const isSinglePage = (filteredProducts.length / perPageNumber) <= 1;

  return (
    <div className="ProductsList" data-cy="productList">
      {pathname.split('/')[1] !== 'favourites' && (
        <div className="ProductsList__dropdowns">
          <Dropdown
            title="Sort by"
            selectedValue={
              findAppliedValueName(sortBy, sortingOptions) || 'Newest'
            }
            options={sortingOptions}
            setValue={(newValue) => {
              setSortBy(newValue);
              applySearchParam(newValue, 'sort');
            }}
          />
          <Dropdown
            title="Items on page"
            selectedValue={
              findAppliedValueName(perPage, paginationOptions) || '8'
            }
            options={paginationOptions}
            setValue={(newValue) => {
              setPerPage(newValue);
              applySearchParam(newValue, 'perPage');
            }}
            isSmall
          />
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <NoSearchResults />
      ) : (
        <div className="ProductsList__products">
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!isSinglePage && (
        <div className="ProductsList__pagination">
          <Pagination
            page={pageNumber}
            setPage={(newValue) => {
              setPage(newValue);
              applySearchParam(newValue, 'page');
            }}
            totalProducts={filteredProducts.length}
            perPage={perPageNumber}
          />
        </div>
      )}
    </div>
  );
};
