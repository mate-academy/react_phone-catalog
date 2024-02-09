import './ProductsList.scss';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { GlobalContext } from '../../GlobalContext';
import { Pagination } from '../Pagination';
import { getFilteredProducts } from '../../services/getFilteredProducts';
import { SearchParams, getSearchWith } from '../../services/searchHelper';
import { NoResults } from '../NoResults';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const { categoriesList } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const [isSeletedSort, setIsSeletedSort] = useState(false);
  const [isSeletedPagination, setIsSeletedPagination] = useState(false);
  const sortRef = useRef<HTMLSelectElement>(null);
  const paginationRef = useRef<HTMLSelectElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams
    .get('perPage')
      || (pathname.includes('favourites') ? 'all' : '4');

  const sortType = searchParams.get('sort') || 'year';
  const query = searchParams.get('query') || '';
  const page = +(searchParams.get('page') || 1);

  const sortedProducts = getFilteredProducts(products, query, sortType);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const total = sortedProducts.length;
  const per = perPage === 'all' ? total : +perPage;

  const sliceTo = page * per;
  const sliceFrom = sliceTo - per;
  const itemsList = sortedProducts.slice(sliceFrom, sliceTo);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({
      perPage: event.target.value,
      page: '1',
    });
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({
      sort: event.target.value,
      page: '1',
    });
  };

  useEffect(() => {
    if (sortRef.current) {
      if (isSeletedSort) {
        sortRef.current.focus();
      } else {
        sortRef.current.blur();
      }
    }

    if (paginationRef.current) {
      if (isSeletedPagination) {
        paginationRef.current.focus();
      } else {
        paginationRef.current.blur();
      }
    }
  }, [isSeletedSort, isSeletedPagination]);

  const title = categoriesList
    .find(c => `/${c.name}` === pathname)?.title
    || (pathname.slice(1) === 'favourites' ? 'Favourites' : '');

  return (
    <>
      {products.length > 0 && (
        <div className="Products">
          <div className="Products__top">
            {!query && (
              <h1 className="Products__title">
                {title}
              </h1>
            )}

            <p className="Products__text">
              {query && (
                <span>
                  {`${sortedProducts.length} results`}
                </span>
              )}

              {!query && !title.includes('Favourites') && (
                <span>
                  {`${sortedProducts.length} models`}
                </span>
              )}

              {!query && title.includes('Favourites') && (
                <span>
                  {`${sortedProducts.length} items`}
                </span>
              )}
            </p>
          </div>

          {!query && !title.includes('Favourites') && (
            <div className="Products__selects">
              <div className="Products__select-wrapper">
                <label
                  htmlFor="sort"
                  className="Products__select-lable"
                >
                  Sort by
                </label>

                <select
                  ref={sortRef}
                  name="SortBy"
                  id="sort"
                  className="Products__select Products__select--sort"
                  onClick={() => setIsSeletedSort(!isSeletedSort)}
                  onChange={handleSort}
                  value={sortType}
                >
                  <option value="year">
                    Newest
                  </option>

                  <option value="name">
                    Alphabetically
                  </option>

                  <option value="price">
                    Cheapest
                  </option>
                </select>
              </div>

              <div className="Products__select-wrapper">
                <label
                  htmlFor="pagination"
                  className="Products__select-lable"
                >
                  Items on page
                </label>

                <select
                  ref={paginationRef}
                  name="Pagination"
                  id="pagination"
                  className="Products__select Products__select--pagination"
                  onClick={() => setIsSeletedPagination(!isSeletedPagination)}
                  onChange={handleChange}
                  value={perPage}
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>
          )}

          <ul className="Products__list" data-cy="productList">
            {itemsList.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </ul>

          {per !== sortedProducts.length && sortedProducts.length > 4 && (
            <Pagination
              total={total}
              perPage={per}
            />
          )}
        </div>
      )}

      {products.length === 0 && (
        <NoResults categoryName={title} />
      )}
    </>
  );
};
