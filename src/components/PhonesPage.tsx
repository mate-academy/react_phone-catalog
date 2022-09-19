/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { Pagination } from './Pagination';
import { ProductList } from './ProductList';
import { ProductsContext } from './ProductsContext';
import { SearchLink } from './SearchLink';

const getFullPrice = (price: number, discount: number) => {
  if (!discount) {
    return price;
  }

  return price - (price * (discount / 100));
};

export const PhonesPage = React.memo(() => {
  const { products } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [isSortOpened, setIsSortOpened] = useState(false);
  const [isPagesOpened, setIsPagesOpened] = useState(false);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';
  let activeFilter = 'All';

  let sortedProducts: Product[] = [];
  const phones = [...products].filter(item => item.type === 'phone');

  switch (filter) {
    case '':
      sortedProducts = phones;
      activeFilter = 'All';
      break;
    case 'newest':
      sortedProducts = phones.sort((a, b) => a.age - b.age);
      activeFilter = 'Newest';

      break;

    case 'oldest':
      sortedProducts = phones.sort((a, b) => b.age - a.age);
      activeFilter = 'Oldest';

      break;

    case 'asc':
      sortedProducts = phones
        .sort((a, b) => getFullPrice(+a.price, +a.discount) - getFullPrice(+b.price, +b.discount));
      activeFilter = 'From Cheap';

      break;

    case 'desc':
      sortedProducts = phones
        .sort((a, b) => getFullPrice(+b.price, +b.discount) - getFullPrice(+a.price, +a.discount));
      activeFilter = 'From expensive';

      break;

    default:
      break;
  }

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

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

  sortedProducts = [...sortedProducts].filter(item => {
    if (item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
      return true;
    }

    return false;
  });

  const currentProducts = sortedProducts.slice(firstItemIndex, lastItemIndex);

  return (
    <>
      <div className="container grid">
        <div className="subheader grid__item--1-3">
          <Link to="/">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.59075 0.807088C7.83149 0.619846 8.16859 0.619846 8.40933 0.807088L14.4093 5.47375C14.5717 5.60006 14.6667 5.79426 14.6667 5.99999V13.3333C14.6667 13.8638 14.456 14.3725 14.0809 14.7475C13.7058 15.1226 13.1971 15.3333 12.6667 15.3333H3.33337C2.80294 15.3333 2.29423 15.1226 1.91916 14.7475C1.54409 14.3725 1.33337 13.8638 1.33337 13.3333V5.99999C1.33337 5.79426 1.42836 5.60006 1.59075 5.47375L7.59075 0.807088ZM2.66671 6.32605V13.3333C2.66671 13.5101 2.73695 13.6797 2.86197 13.8047C2.98699 13.9298 3.15656 14 3.33337 14H12.6667C12.8435 14 13.0131 13.9298 13.1381 13.8047C13.2631 13.6797 13.3334 13.5101 13.3334 13.3333V6.32605L8.00004 2.1779L2.66671 6.32605Z" fill="#313237" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5.33337 8.00001C5.33337 7.63182 5.63185 7.33334 6.00004 7.33334H10C10.3682 7.33334 10.6667 7.63182 10.6667 8.00001V14.6667C10.6667 15.0349 10.3682 15.3333 10 15.3333C9.63185 15.3333 9.33337 15.0349 9.33337 14.6667V8.66668H6.66671V14.6667C6.66671 15.0349 6.36823 15.3333 6.00004 15.3333C5.63185 15.3333 5.33337 15.0349 5.33337 14.6667V8.00001Z" fill="#313237" />
            </svg>
          </Link>

          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#B4BDC4" />
          </svg>

          <p className="subheader__text small-text">
            Phones
          </p>

        </div>

        <h1 className="subheader__title grid__item--1-7">Mobile phones</h1>

        <p className="subheader__quantity grid__item--1-2 body-text">{`${phones.length} models`}</p>

        <p className="sort__heading small-text grid__item--1-2">Sort by</p>

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
              params={{ sort: 'asc' }}
              setIsSortOpened={setIsSortOpened}
            >
              From Cheap
            </SearchLink>

            <SearchLink
              className="sort__option body-text"
              params={{ sort: 'desc' }}
              setIsSortOpened={setIsSortOpened}
            >
              From expensive
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

          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.47149 0.528636C9.73184 0.788986 9.73184 1.2111 9.47149 1.47145L5.47149 5.47144C5.21114 5.73179 4.78903 5.73179 4.52868 5.47144L0.528677 1.47144C0.268327 1.2111 0.268327 0.788985 0.528677 0.528636C0.789026 0.268286 1.21114 0.268286 1.47149 0.528636L5.00008 4.05723L8.52868 0.528636C8.78903 0.268287 9.21114 0.268287 9.47149 0.528636Z" fill="#B4BDC4" />
          </svg>

        </button>

        <p className="sort__heading sort__heading--items small-text grid__item--5-7">Items on page</p>

        <button
          type="button"
          className="sort sort--items grid__item--5-7 button-text"
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
              className="sort__option sort__option--desktop body-text"
              onClick={() => {
                setItemsPerPage(2);
                setCurrentPage(1);
              }}
            >
              2
            </button>

            <button
              type="button"
              className="sort__option sort__option--desktop body-text"
              onClick={() => {
                setItemsPerPage(3);
                setCurrentPage(1);
              }}
            >
              3
            </button>

            <button
              type="button"
              className="sort__option sort__option--desktop body-text"
              onClick={() => {
                setItemsPerPage(4);
                setCurrentPage(1);
              }}
            >
              4
            </button>

            <button
              type="button"
              className="sort__option sort__option--desktop body-text"
              onClick={() => {
                setItemsPerPage(6);
                setCurrentPage(1);
              }}
            >
              6
            </button>

            <button
              type="button"
              className="sort__option sort__option--desktop body-text"
              onClick={() => {
                setItemsPerPage(8);
                setCurrentPage(1);
              }}
            >
              8
            </button>

            <button
              type="button"
              className="sort__option sort__option--desktop body-text"
              onClick={() => {
                setItemsPerPage(9);
                setCurrentPage(1);
              }}
            >
              9
            </button>

            <button
              type="button"
              className="sort__option sort__option--desktop body-text"
              onClick={() => {
                setItemsPerPage(12);
                setCurrentPage(1);
              }}
            >
              12
            </button>

            <button
              type="button"
              className="sort__option sort__option--desktop body-text"
              onClick={() => {
                setItemsPerPage(16);
                setCurrentPage(1);
              }}
            >
              16
            </button>

            <button
              type="button"
              className="sort__option sort__option--desktop body-text"
              onClick={() => {
                setItemsPerPage(20);
                setCurrentPage(1);
              }}
            >
              20
            </button>

          </div>

          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.47149 0.528636C9.73184 0.788986 9.73184 1.2111 9.47149 1.47145L5.47149 5.47144C5.21114 5.73179 4.78903 5.73179 4.52868 5.47144L0.528677 1.47144C0.268327 1.2111 0.268327 0.788985 0.528677 0.528636C0.789026 0.268286 1.21114 0.268286 1.47149 0.528636L5.00008 4.05723L8.52868 0.528636C8.78903 0.268287 9.21114 0.268287 9.47149 0.528636Z" fill="#B4BDC4" />
          </svg>

        </button>

      </div>

      <div className="container">
        {currentProducts.length
          ? <ProductList products={currentProducts} />
          : (
            <h1>
              We can&apos;t find any phone by your request
            </h1>
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
