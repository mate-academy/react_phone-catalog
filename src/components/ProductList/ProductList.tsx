import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';

import './ProductList.scss';
import '../../App.scss';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';

type Props = {
  searchParams: any;
  visibleProducts: Product[];
  setSearchParams: (searchParam: any) => void;
  productsFromServer: Product[];
  productsLoading: boolean;
  pageName: string;
};

export const ProductList: React.FC<Props> = ({
  searchParams,
  visibleProducts,
  setSearchParams,
  productsFromServer,
  productsLoading,
  pageName,
}) => {
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  const [isPerPageFocused, setIsPerPageFocused] = useState(false);
  const [perPage, setPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  const sort = searchParams.get('sort') || '';
  const location = useLocation();
  const pathNameUrl = location.pathname.slice(1);

  const handleSortBy = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort === '') {
      params.set('sort', sortBy);
    } else if (sort === sortBy) {
      params.delete('sort');
    } else {
      params.set('sort', sortBy);
    }

    setSearchParams(params);
  };

  const handleSelectBlur = () => {
    setIsSelectFocused(false);
    setIsPerPageFocused(false);
  };

  const handleSelectFocus = () => {
    setIsSelectFocused(!isSelectFocused);
  };

  const handlePerPageFocus = () => {
    setIsPerPageFocused(!isPerPageFocused);
  };

  const itemsPerPageOptions = [4, 8, 16];

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const params = new URLSearchParams(searchParams);

      params.set('page', page.toString());

      setSearchParams(params);
    }
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);

    setPerPage(value);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);

    params.set('perPage', value.toString());
    setSearchParams(params);
  };

  const startItem = (currentPage - 1) * perPage + 1;

  const displayedItems = visibleProducts.slice(
    startItem - 1,
    startItem - 1 + perPage,
  );

  const noPagination = visibleProducts.length <= displayedItems.length;

  const addMargin = {
    marginBottom: noPagination ? '80px' : '0',
  };

  return (
    <section className="product-list">
      <div className="product-list__top">
        <div className="brandcrumbs product-list__url">
          <Link to="/">
            <img
              src="./icons/Home.svg"
              alt="home"
              className="product-list__home"
            />
          </Link>
          <img
            src="./icons/Chevron-Arrow-Right--disabled.svg"
            alt=""
            className="product-list__url-arrow"
          />
          <p
            className="
              brandcrumbs__name
              product-list__url-pathname
            "
          >
            {pathNameUrl}
          </p>
        </div>

        <h1 className="title product-list__title">{pageName}</h1>
        <p className="product-list__count product-list__count-content">
          {`${productsFromServer.length} models`}
        </p>

        <div className="product-list__input product-list__input--sort">
          <label htmlFor="sort" className="product-list__input-label">
            Sort by
          </label>
          <div
            className={cn('product-list__select-container', {
              'product-list__select-container--focused': isSelectFocused,
            })}
          >
            <select
              className="product-list__select"
              name="sort-by"
              id="sort"
              onChange={e => {
                handleSortBy(e.target.value);
              }}
              onClick={handleSelectFocus}
              onBlur={handleSelectBlur}
            >
              <option className="product-list__option" value="age">
                Newest
              </option>
              <option className="product-list__option" value="name">
                Alphabetically
              </option>
              <option className="product-list__option" value="price">
                Cheapest
              </option>
            </select>
          </div>
        </div>

        <div className="product-list__input product-list__input--perpage">
          <label
            htmlFor="perPageSelector"
            className="product-list__input-label"
          >
            Items per page
          </label>

          <div
            className={cn('product-list__select-container', {
              'product-list__select-container--focused': isPerPageFocused,
            })}
          >
            <select
              className="product-list__select product-list__select--perPage"
              data-cy="perPageSelector"
              id="perPageSelector"
              value={perPage}
              onChange={handlePerPageChange}
              onClick={handlePerPageFocus}
              onBlur={handleSelectBlur}
            >
              {itemsPerPageOptions.map(option => (
                <option
                  className="product-list__option"
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
              <option
                className="product-list__option"
                value={productsFromServer.length}
              >
                All
              </option>
            </select>
          </div>
        </div>
      </div>

      {productsLoading && <Loader />}

      {!productsLoading && displayedItems.length > 0 ? (
        <div
          data-cy="productList"
          className="product-list__list"
          style={addMargin}
        >
          {displayedItems.map((product: Product) => (
            <Link
              to={`/${product.category}/${product.itemId}`}
              className="product-list__link"
              key={product.id}
            >
              <ProductCard product={product} key={product.id} />
            </Link>
          ))}
        </div>
      ) : (
        <NoSearchResults />
      )}

      {visibleProducts.length > displayedItems.length && (
        <Pagination
          total={productsFromServer.length}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};
