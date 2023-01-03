import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from '../Dropdown';
import { ProductCard } from '../ProductCard';
import { NoProductsFound } from '../NoProductsFound';
import { Pagination } from '../Pagination';
import {
  findApliedValueName,
  sortingOptions,
  paginationOptions,
  parseStringToNumber,
  getVisibleProducts,
  getPerPageNumber,
  getProductsFromQuery,
} from './utils';
import './ProductsList.scss';
import { getSortedProducts } from '../../helpers/utils';

type Props = {
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({
  products,
}) => {
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
  // perPage uses a searate function because it has a default value and accomodates for the "all" option
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

  const resetPageNumber = () => {
    setPage('1');
    applySearchParam('', 'page');
  };

  const getSetValueFunction = (
    changeStateFunction: (newValue: string) => void,
    key: string,
  ) => {
    return (newValue: string) => {
      changeStateFunction(newValue);
      applySearchParam(newValue, key);
      if (key === 'page') {
        return;
      }

      // reset page number on sorting change
      if (key !== 'page') {
        resetPageNumber();
      }
    };
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    // this if prevents any action on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    setQuery(appliedQuery);
    resetPageNumber();
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
    <div className="products-list">
      <div className="products-list__dropdowns">
        <Dropdown
          title="Sort By"
          defaultValue="Default"
          selectedValue={
            findApliedValueName(sortBy, sortingOptions) || 'Newest'
          }
          options={sortingOptions}
          setValue={getSetValueFunction(setSortBy, 'sort')}
        />
        <Dropdown
          title="Items on page"
          defaultValue="Default"
          selectedValue={
            findApliedValueName(perPage, paginationOptions) || '8'
          }
          options={paginationOptions}
          setValue={getSetValueFunction(setPerPage, 'perPage')}
          isSmall
        />
      </div>
      {filteredProducts.length === 0 ? (
        <NoProductsFound />
      ) : (
        <div className="products-list__products">
          {visibleProducts.map(product => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
      )}
      {!isSinglePage && (
        <div className="products-list__pagination">
          <Pagination
            page={pageNumber}
            setPage={getSetValueFunction(setPage, 'page')}
            totalProducts={filteredProducts.length}
            perPage={perPageNumber}
          />
        </div>
      )}
    </div>
  );
};
