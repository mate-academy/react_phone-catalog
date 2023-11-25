import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';
import { Errors } from '../../types/Errors';
import { Product } from '../../types/Product';
import { SortedBy, PaginationItems } from '../../types/Sorting';
import { NoResults } from '../additional/NoResults';
import { Pagination } from './Pagination';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[],
  serchResult: (num: number) => void,
};

export const ProductList: React.FC<Props> = ({ products, serchResult }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsPage = searchParams.get('page') || '';
  const paramsPerPage = searchParams.get('perPage') || '';
  const paramsSort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  const [perPage, setPerPage] = useState(paramsPerPage || PaginationItems.num3);
  const [currentPage, setCurrentPage] = useState(paramsPage || '1');
  const [sorting, setSorting] = useState(paramsSort || SortedBy.Newest);

  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isPagination, setIsPagination] = useState(true);
  const [isError, setIsError] = useState(false);

  const getProductsCount = () => {
    let itemsCount;
    const from = (+currentPage - 1) * +perPage;
    const to = +currentPage * +perPage > products.length
      ? products.length
      : +currentPage * +perPage;

    itemsCount = [...products].slice(from, to);

    if (perPage === PaginationItems.All) {
      itemsCount = [...products];
    }

    if (itemsCount.length === products.length) {
      setIsPagination(false);
    } else {
      setIsPagination(true);
    }

    const sortedProducts = itemsCount.sort((itemOne, itemTwo) => {
      switch (sorting) {
        case SortedBy.Newest:
          return itemOne.age - itemTwo.age;

        case SortedBy.Alphabetically:
          return itemOne.name.localeCompare(itemTwo.name);

        case SortedBy.Cheapest:
          return itemOne.price - itemTwo.price;

        default:
          return 0;
      }
    });

    if (query) {
      const searchedProducts = sortedProducts.filter(item => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      });

      if (searchedProducts.length > 0) {
        setIsError(false);
      } else {
        setIsError(true);
      }

      serchResult(searchedProducts.length);

      return setVisibleProducts(searchedProducts);
    }

    serchResult(0);
    setIsError(false);

    return setVisibleProducts(sortedProducts);
  };

  const handleOnPagination = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    const isPaginationValue = false
      || value === PaginationItems.All
      || value === PaginationItems.num1
      || value === PaginationItems.num2
      || value === PaginationItems.num3
      || value === PaginationItems.num4;

    if (isPaginationValue) {
      setPerPage(value);
      setCurrentPage('1');
      setSearchParams(getSearchWith(searchParams, { perPage: value }));
    }
  };

  const handleOnSortedBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    const isSortedByValue = false
      || value === SortedBy.Newest
      || value === SortedBy.Alphabetically
      || value === SortedBy.Cheapest;

    if (isSortedByValue) {
      setSorting(value);
      setSearchParams(getSearchWith(searchParams, { sort: value }));
    }
  };

  const getVisibleProducts = () => {
    getProductsCount();

    if (paramsPage) {
      if (currentPage !== '1') {
        navigate({
          pathname,
          search: getSearchWith(searchParams, { page: currentPage }),
        });
      } else {
        setSearchParams(getSearchWith(searchParams, { page: currentPage }));
      }
    }
  };

  useEffect(() => {
    getVisibleProducts();
  }, [products, currentPage, perPage, sorting, query]);

  return (
    <section
      data-cy="productList"
      className="product-list"
    >
      <div className="product-list__sorting">
        <div>
          <span className="product-list__sorting__title"> Sort By </span>
          <select
            className="product-list__sorting__select"
            value={sorting}
            onChange={handleOnSortedBy}
          >
            {Object.entries(SortedBy).map(option => (
              <option
                key={option[0]}
                value={option[1]}
              >
                {option[0]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="product-list__sorting__title"> Items on page </span>
          <select
            className="product-list__sorting__select"
            value={perPage}
            onChange={handleOnPagination}
          >
            {Object.entries(PaginationItems).map(option => (
              <option
                key={option[0]}
                value={option[1]}
              >
                {option[1]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isError && (<NoResults text={Errors.SEARCH} isShowButton={false} />)}

      {!isError && (<ProductCard products={visibleProducts} />)}

      {isPagination && !isError && (
        <Pagination
          total={products.length}
          perPage={Number(perPage)}
          currentPage={Number(currentPage)}
          onPageChange={setCurrentPage}
        />
      )}

    </section>
  );
};
