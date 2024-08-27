/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import classNames from 'classnames';
import { MenuOpen } from '../../utils/MenuContext';
import { Product } from '../../types/Propduct';
import customSelect from 'custom-select';
import { ProductCard } from '../ProductCard/ProductCard';

import './Catalog.scss';
import { Footer } from '../Footer/Footer';
import { Loader } from '../Loader/Loader';

type Props = {
  products: Product[];
};

enum ElementsPerPage {
  four = 4,
  eight = 8,
  sixteen = 16,
}

enum SortBy {
  newest = 'Newest',
  alphabetically = 'Alphabetically',
  cheapest = 'Cheapest',
}

export const Catalog: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [sortBy, setSortBy] = useState(
    searchParams.get('sortBy') || SortBy.newest,
  );
  const [elemsPerPage, setElemsPerPage] = useState(
    searchParams.get('perPage') || ElementsPerPage.eight,
  );

  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  const lastPage: number = +products.length;
  const paginationCount: number[] = [];
  let itemsAndPage: Product[] = [];

  const { isMenuOpen } = useContext(MenuOpen);

  const filterProducts = () => {
    const filteredProducts: Product[] = [];

    products.forEach(item => {
      if (
        ((item.category === 'tablets' || item.category === 'phones') &&
          item.itemId.includes('256gb')) ||
        (item.category === 'accessories' && item.itemId.includes('40mm'))
      ) {
        filteredProducts.push(item);
      }
    });

    return filteredProducts;
  };

  const arrSortBy = (arr: Product[]) => {
    switch (sortBy) {
      case SortBy.newest:
        return arr.sort((a, b) => b.year - a.year);
      case SortBy.alphabetically:
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case SortBy.cheapest:
        return arr.sort((a, b) => a.price - b.price);
      default:
        return arr;
    }
  };

  const title = () => {
    switch (products[0].category) {
      case 'phones':
        return 'Mobile phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return '';
    }
  };

  useEffect(() => {
    setPage(1);

    setTimeout(() => setIsLoading(false), 600);

    const selectElementSortBy = document.getElementById(
      'sortBy',
    ) as HTMLSelectElement;

    const selectElementPerPage = document.getElementById(
      'perPageSelector',
    ) as HTMLSelectElement;

    customSelect(selectElementSortBy);
    customSelect(selectElementPerPage);

    // Event listener to trigger the React onChange handler
    const handleChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const changeEvent = new Event('change', { bubbles: true });

      target.dispatchEvent(changeEvent);
    };

    // if (selectElementSortBy && selectElementPerPage) {
    selectElementSortBy.addEventListener('change', handleChange);
    selectElementPerPage.addEventListener('change', handleChange);
    // }

    // Cleanup the event listener on unmount
    return () => {
      // if (selectElementSortBy && selectElementPerPage) {
      selectElementSortBy.removeEventListener('change', handleChange);
      selectElementPerPage.removeEventListener('change', handleChange);
      // }
    };
  }, []);

  for (
    let i = 1;
    i <= Math.ceil(arrSortBy(filterProducts()).length / +elemsPerPage);
    i++
  ) {
    paginationCount.push(i);
  }

  function getElentsPerPageInUrl(
    value: string = elemsPerPage.toString(),
    sortByParam: string = sortBy,
  ) {
    setSearchParams({
      page: page.toString(),
      perPage: value,
      sortBy: sortByParam,
    });
  }

  if (page === 1) {
    itemsAndPage = arrSortBy(filterProducts()).slice(0, +elemsPerPage);
  } else {
    itemsAndPage = arrSortBy(filterProducts()).slice(
      (+page - 1) * +elemsPerPage,
      Math.min(+elemsPerPage * +page, lastPage),
    );
  }

  const modelsQuantity = () => {
    let counter = 0;

    arrSortBy(filterProducts()).forEach(item => {
      if (
        ((item.category === 'tablets' || item.category === 'phones') &&
          item.itemId.includes('256gb')) ||
        (item.category === 'accessories' && item.itemId.includes('40mm'))
      ) {
        counter++;
      }
    });

    return counter;
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setElemsPerPage(+event.target.value);
    getElentsPerPageInUrl(event.target.value);
  };

  return (
    <>
      <div className="Catalog">
        <Header />
        {isMenuOpen && <Menu />}
        <main className="catalog-main">
          <div className="navigation">
            <Link to="/" className="navigation__home" />
            <img src=".\img\arrow-next-disabled.svg" alt="next page" />
            <p className="navigation__current-page">{products[0].category}</p>
          </div>
          <h1 className="catalog-main__title">{title()}</h1>
          <p className="catalog-main__models-quantity">
            {modelsQuantity()} models
          </p>
          <div className="catalog-main__select-box">
            <select
              name="sortBy"
              id="sortBy"
              className="form-select form-select--sort-by"
              onChange={event => {
                setSortBy(event.target.value);
                getElentsPerPageInUrl(undefined, event.target.value);
              }}
            >
              <option
                value={SortBy.newest}
                className="catalog-main__select-item"
                selected={sortBy === SortBy.newest}
              >
                {SortBy.newest}
              </option>
              <option
                value={SortBy.alphabetically}
                className="catalog-main__select-item"
                selected={sortBy === SortBy.alphabetically}
              >
                {SortBy.alphabetically}
              </option>
              <option
                value={SortBy.cheapest}
                className="catalog-main__select-item"
                selected={sortBy === SortBy.cheapest}
              >
                {SortBy.cheapest}
              </option>
            </select>
            <select
              id="perPageSelector"
              name="perPageSelector"
              className="form-select form-select--per-page-items"
              onChange={handleChange}
            >
              <option
                value="4"
                selected={+elemsPerPage === 4}
                className="catalog-main__select-item"
              >
                {ElementsPerPage.four}
              </option>
              <option
                value="8"
                selected={+elemsPerPage === 8}
                className="catalog-main__select-item"
              >
                {ElementsPerPage.eight}
              </option>
              <option
                value="16"
                selected={+elemsPerPage === 16}
                className="catalog-main__select-item"
              >
                {ElementsPerPage.sixteen}
              </option>
              <option
                value={products.length}
                selected={+elemsPerPage === products.length}
                className="catalog-main__select-item"
              >
                all
              </option>
            </select>
          </div>
          {isLoading ? (
            <div className="loader-box">
              <Loader />
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="catalog-main__content-box">
                {itemsAndPage.map(item => (
                  <ProductCard id={item.id} key={item.id} />
                ))}
              </div>
              <ul className="pagination">
                <li className="pagination__item">
                  <Link
                    data-cy="prevLink"
                    className={classNames(
                      'pagination__link pagination__link--arrow-prev',
                      {
                        'disabled-link': page === 1,
                      },
                    )}
                    to={`?page=${+page - 1}&perPage=${elemsPerPage}`}
                    onClick={() => {
                      setPage(+page - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </li>

                {paginationCount.map(count => (
                  <li
                    key={count.toString()}
                    className="pagination__item"
                    onClick={() => setPage(count)}
                  >
                    <Link
                      className={classNames('pagination__link', {
                        'disabled-active-link': page === count,
                      })}
                      to={`?page=${count}&perPage=${elemsPerPage}`}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    >
                      {count}
                    </Link>
                  </li>
                ))}
                <li className="pagination__item">
                  <Link
                    data-cy="nextLink"
                    className={classNames(
                      'pagination__link pagination__link--arrow-next',
                      {
                        'disabled-link': page === paginationCount.length,
                      },
                    )}
                    to={`?page=${+page + 1}&perPage=${elemsPerPage}`}
                    onClick={() => {
                      setPage(+page + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </li>
              </ul>
            </>
          ) : (
            <div className="no-found-box">
              <h1 className="no-product-title">Have no {pathname.slice(1)}</h1>
            </div>
          )}
        </main>
        <Footer />
      </div>

      <Outlet />
    </>
  );
};
