import { ProductCard } from '../../components/ProductCard';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useAppSelector } from '../../hooks/DispatchSelector';
import { Product } from '../../types/Product';
import { useState } from 'react';
import { SortBy } from '../../types/SortBy';
import cn from 'classnames';
import s from './ProductPage.module.scss';

export const ProductPage = () => {
  const [sortBy, setSortBy] = useState(SortBy.new);
  const [perPage, setPerPage] = useState(16);
  const [isOpenSortBy, setIsOpenSortBy] = useState(false);
  const [isOpenPerPage, setIsOpenPerPage] = useState(false);
  const productsFromServer = useAppSelector(state => state.products);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.replace('/', '');
  const products = productsFromServer.filter(
    (product: Product) => product.category === path,
  );
  const productsCount = products.length;

  const categoryTitle = () => {
    switch (path) {
      case 'phones':
        return 'Phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return 'Best gadgets ever';
    }
  };

  const handleSortBy = (sort: string) => {
    setSortBy(sort as SortBy);
    setIsOpenSortBy(false);
  };

  const handleSortByDropdown = () => {
    setIsOpenSortBy(!isOpenSortBy);
  };

  const handlePerPage = (amount: number) => {
    setPerPage(amount);
    navigate({
      pathname: location.pathname,
      search: '',
    });
    setIsOpenPerPage(false);
  };

  const handlePerPageDropdown = () => {
    setIsOpenPerPage(!isOpenPerPage);
  };

  switch (sortBy) {
    case SortBy.new:
      products.sort((a: Product, b: Product) => b.year - a.year);
      break;
    case SortBy.old:
      products.sort((a: Product, b: Product) => a.year - b.year);
      break;
    case SortBy.cheap:
      products.sort((a: Product, b: Product) => a.price - b.price);
      break;
    case SortBy.expansive:
      products.sort((a: Product, b: Product) => b.price - a.price);
      break;
    default:
      break;
  }

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? +page : 1;
  const startIndex = (currentPage - 1) * perPage;
  const productsToShow = products.slice(startIndex, startIndex + perPage);
  const totalPages = Math.ceil(products.length / perPage);
  const showPagination = products.length > perPage;

  const generatePageLink = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());

    return `${location.pathname}?${params.toString()}`;
  };

  const getPaginationRange = () => {
    const range = [];
    const maxLinks = 4;

    let start = Math.max(1, currentPage - Math.floor(maxLinks / 2));
    const end = Math.min(totalPages, start + maxLinks - 1);

    if (end - start + 1 < maxLinks) {
      start = Math.max(1, end - maxLinks + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <main>
      <h2>{categoryTitle()}</h2>
      <p className={s.subtitle}>{productsCount} models</p>
      <div className="filters">
        <div className="filters__group">
          <label htmlFor="sortBy" className="filters__group__label">
            Sort by
          </label>
          <div
            className={cn('select', {
              'select--open': isOpenSortBy,
            })}
            id="sortBy"
            onClick={handleSortByDropdown}
          >
            <div className="select__input">{sortBy}</div>
            {isOpenSortBy ? (
              <img
                src="./img/icons/arrow-top.svg"
                alt="Up arrow"
                className="select__arrow"
              />
            ) : (
              <img
                src="./img/icons/arrow-down.svg"
                alt="Down arrow"
                className="select__arrow"
              />
            )}
          </div>
          {isOpenSortBy && (
            <ul className="selectdropdown">
              <li
                className={s.selectdropdown__item}
                onClick={() => handleSortBy(SortBy.new)}
              >
                {SortBy.new}
              </li>
              <li
                className={s.selectdropdown__item}
                onClick={() => handleSortBy(SortBy.old)}
              >
                {SortBy.old}
              </li>
              <li
                className={s.selectdropdown__item}
                onClick={() => handleSortBy(SortBy.cheap)}
              >
                {SortBy.cheap}
              </li>
              <li
                className={s.selectdropdown__item}
                onClick={() => handleSortBy(SortBy.expansive)}
              >
                {SortBy.expansive}
              </li>
            </ul>
          )}
        </div>
        <div className="filters__group">
          <label htmlFor="perPage" className="filters__group__label">
            Items on page
          </label>
          <div
            className={cn('select', {
              'select--open': isOpenPerPage,
            })}
            id="perPage"
            onClick={handlePerPageDropdown}
          >
            <div className="select__input">{perPage}</div>
            {isOpenPerPage ? (
              <img
                src="./img/icons/arrow-top.svg"
                alt="Up arrow"
                className="select__arrow"
              />
            ) : (
              <img
                src="./img/icons/arrow-down.svg"
                alt="Down arrow"
                className="select__arrow"
              />
            )}
          </div>
          {isOpenPerPage && (
            <ul className="select-dropdown">
              <li
                className="select-dropdown__item"
                onClick={() => handlePerPage(32)}
              >
                32
              </li>
              <li
                className="select-dropdown__item"
                onClick={() => handlePerPage(16)}
              >
                16
              </li>
              <li
                className="select-dropdown__item"
                onClick={() => handlePerPage(8)}
              >
                8
              </li>
              <li
                className="select-dropdown__item"
                onClick={() => handlePerPage(4)}
              >
                4
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="products">
        {productsToShow.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      {showPagination && (
        <div className="pagination">
          <Link
            to={generatePageLink(
              currentPage - 1 < 1 ? currentPage : currentPage - 1,
            )}
            className={cn('pagination__item pagination__arrow-fon', {
              'pagination__item--disabled': currentPage === 1,
            })}
          >
            {currentPage === 1 ? (
              <img
                src="./img/icons/arrow-left.svg"
                alt="Left arrow"
                className="pagination__arrow"
              />
            ) : (
              <img
                src="./img/icons/arrow-left-white.svg"
                alt="Left arrow"
                className="pagination__arrow"
              />
            )}
          </Link>
          {paginationRange.map(pageNumber => (
            <Link
              key={pageNumber}
              to={generatePageLink(pageNumber)}
              className={cn('pagination__page pagination__item', {
                'pagination__page--active': currentPage === pageNumber,
              })}
            >
              {pageNumber}
            </Link>
          ))}
          <Link
            to={generatePageLink(
              currentPage + 1 > totalPages ? currentPage : currentPage + 1,
            )}
            className={cn('pagination__item pagination__arrow-fon', {
              'pagination__item--disabled': currentPage === totalPages,
            })}
          >
            {currentPage === totalPages ? (
              <img
                src="./img/icons/arrow-right.svg"
                alt="Right arrow"
                className="pagination__arrow"
              />
            ) : (
              <img
                src="./img/icons/arrow-right-white.svg"
                alt="Right arrow"
                className="pagination__arrow"
              />
            )}
          </Link>
        </div>
      )}
    </main>
  );
};
