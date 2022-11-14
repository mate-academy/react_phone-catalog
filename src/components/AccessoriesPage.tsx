/* eslint-disable max-len */
import React, { useContext, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { ProductsContext } from './ProductsContext';
import { SearchLink } from './SearchLink';
import { Product } from '../types/Product';
import { ProductList } from './ProductList';
import { Pagination } from './Pagination';
import { getFullPrice } from '../helpers/getFullPrice';

export const AccessoriesPage = React.memo(() => {
  const { products } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [isSortOpened, setIsSortOpened] = useState(false);
  const [isPagesOpened, setIsPagesOpened] = useState(false);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  let activeFilter = 'All';
  let sortedProducts: Product[] = [];
  const accessories = [...products].filter(product => product.type === 'accessories');

  switch (filter) {
    case '':
      sortedProducts = accessories;
      activeFilter = 'All';
      break;

    case 'alphabetically':
      sortedProducts = accessories.sort((a, b) => a.name.localeCompare(b.name));
      activeFilter = 'Alphabetically';
      break;

    case 'newest':
      sortedProducts = accessories.sort((a, b) => a.age - b.age);
      activeFilter = 'Newest';
      break;

    case 'oldest':
      sortedProducts = accessories.sort((a, b) => b.age - a.age);
      activeFilter = 'Oldest';
      break;

    case 'asc':
      sortedProducts = accessories.sort((a, b) => getFullPrice(+a.price, +a.discount) - getFullPrice(+b.price, +b.discount));
      activeFilter = 'Price low to high';
      break;

    case 'desc':
      sortedProducts = accessories.sort((a, b) => getFullPrice(+b.price, +b.discount) - getFullPrice(+a.price, +a.discount));
      activeFilter = 'Price high to low';
      break;

    default:
      break;
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < (products.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  sortedProducts = [...sortedProducts].filter(sortedProduct => {
    if (sortedProduct.name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }

    return false;
  });

  const to = currentPage * itemsPerPage;
  const from = to - itemsPerPage;
  const currentProducts = sortedProducts.slice(from, to);

  return (
    <>
      <div className="container grid">
        <div className="subheader grid__item--1-3">
          <Link to="/">
            <img src="img/svg/home.svg" alt="Home" />
          </Link>

          <img src="img/svg/arrow-right.svg" alt="Arrow right" />

          <p className="subheader__text small-text">
            Accessories
          </p>

        </div>

        <h1 className="subheader__title grid__item--1-7">
          Accessories
        </h1>

        <p className="subheader__quantity grid__item--1-2 body-text">
          {`${accessories.length} models`}
        </p>

        {currentProducts.length > 0
          && <p className="sort__heading grid__item--1-2 small-text">Sort by</p>}

        {currentProducts.length > 0
            && (
              <button
                type="button"
                className="sort grid__item--1-4 button-text"
                onClick={() => {
                  setIsSortOpened(!isSortOpened);
                }}

              >
                <p className="body-text">{activeFilter}</p>

                <div className={classNames(
                  'sort__list',
                  { 'sort__list--active': isSortOpened },
                )}
                >
                  <SearchLink
                    className="sort__option body-text"
                    params={{ sort: null }}
                    setIsSortOpened={setIsSortOpened}
                  >
                    All
                  </SearchLink>

                  <SearchLink
                    className="sort__option body-text"
                    params={{ sort: 'alphabetically' }}
                    setIsSortOpened={setIsSortOpened}
                  >
                    Alphabetically
                  </SearchLink>

                  <SearchLink
                    className="sort__option body-text"
                    params={{ sort: 'asc' }}
                    setIsSortOpened={setIsSortOpened}
                  >
                    Price low to high
                  </SearchLink>

                  <SearchLink
                    className="sort__option body-text"
                    params={{ sort: 'desc' }}
                    setIsSortOpened={setIsSortOpened}
                  >
                    Price high to low
                  </SearchLink>

                  <SearchLink
                    className="sort__option body-text"
                    params={{ sort: 'newest' }}
                    setIsSortOpened={setIsSortOpened}
                  >
                    Newest
                  </SearchLink>

                  <SearchLink
                    className="sort__option body-text"
                    params={{ sort: 'oldest' }}
                    setIsSortOpened={setIsSortOpened}
                  >
                    Oldest
                  </SearchLink>

                </div>

                <img src="img/svg/arrow-down.svg" alt="Arrow down" />

              </button>
            )}

        {currentProducts.length > 0
              && <p className="sort__heading sort__heading--items small-text grid__item--5-7">Items on page</p>}

        {currentProducts.length > 0
                && (
                  <button
                    type="button"
                    className="sort sort--items grid__item--5-7 button--text"
                    onClick={() => {
                      setIsPagesOpened(!isPagesOpened);
                    }}
                  >
                    <p className="body-text">{itemsPerPage}</p>

                    <div className={classNames(
                      'sort__list',
                      { 'sort__list--active': isPagesOpened },
                    )}
                    >

                      <button
                        type="button"
                        className="sort__option  body-text"
                        onClick={() => {
                          setItemsPerPage(4);
                          setCurrentPage(1);
                        }}
                      >
                        4
                      </button>

                      <button
                        type="button"
                        className="sort__option body-text"
                        onClick={() => {
                          setItemsPerPage(8);
                          setCurrentPage(1);
                        }}
                      >
                        8
                      </button>

                      <button
                        type="button"
                        className="sort__option body-text"
                        onClick={() => {
                          setItemsPerPage(16);
                          setCurrentPage(1);
                        }}
                      >
                        16
                      </button>

                      <button
                        type="button"
                        className="sort__option body-text"
                        onClick={() => {
                          setItemsPerPage(accessories.length);
                          setCurrentPage(1);
                        }}
                      >
                        All
                      </button>

                    </div>

                    <img src="img/svg/arrow-down.svg" alt="Arrow down" />

                  </button>
                )}
      </div>

      <div className="container">
        {currentProducts.length
          ? <ProductList products={currentProducts} />
          : (
            <>
              <h1>0 accessory found</h1>
            </>
          )}
      </div>

      {currentProducts.length !== sortedProducts.length
        && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={sortedProducts.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
          />
        )}
    </>
  );
});
