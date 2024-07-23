import { Link, useLocation, useSearchParams } from 'react-router-dom';
import home from '../../img/icons/home.svg';
import { Product } from '../../types/product';
import { useEffect, useState, useRef } from 'react';
import arrowRight from '../../img/icons/arrowRight.svg';
import arrowUp from '../../img/icons/arrowTop.svg';
import arrowDown from '../../img/icons/arrowDown.svg';
import { SearchLink } from '../../components/SearchLink';
import { SortBy } from '../../types/sortBy';
import classNames from 'classnames';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';
import { Catalog } from '../../components/catalog/catalog';

type Props = {
  products: Product[];
};

const perPageOptions = ['all', 16, 8, 4];
const sortType = ['Newest', 'Alphabetically', 'Cheapest'];

export const Phones: React.FC<Props> = ({ products }) => {
  const dropdownRefSort = useRef<HTMLDivElement | null>(null);
  const dropdownRefPerPage = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const pathname = location.pathname.split('').slice(1).join('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const sortBy = searchParams.get('sortBy') || '';
  const perPage = searchParams.get('perPage') || 'all';

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location.pathname])

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const pagesAmmount = function () {
    if (perPage === 'all') {
      return [];
    }

    const arr = [];

    for (let i = 0; i < Math.ceil(products.length / +perPage); i++) {
      arr.push(i + 1);
    }

    if (+currentPage > arr.length) {
      setSearchWith({ page: `${arr.length}` });
    }

    return arr;
  };

  const productsToRender = function () {
    const productsToShow = [...products];

    if (sortBy) {
      productsToShow.sort((a, b) => {
        switch (sortBy) {
          case SortBy.cheapest:
            return a.price - b.price;
          case SortBy.alphabetically:
            return b.name.localeCompare(a.name);
          case SortBy.newest:
            return b.year - a.year;
          default:
            return 0;
        }
      });
    }

    if (perPage === 'all') {
      return productsToShow;
    }

    return productsToShow.slice(
      (+currentPage - 1) * +perPage,
      +currentPage * +perPage,
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRefSort.current &&
      !dropdownRefSort.current.contains(event.target as Node)
    ) {
      setShowSortDropdown(false);
    }

    if (
      dropdownRefPerPage.current &&
      !dropdownRefPerPage.current.contains(event.target as Node)
    ) {
      setShowPerPageDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const buttonsToShow = +currentPage - 3 > 0 ? +currentPage - 3 : 0;

  return (
    <section className="products">
      <div className="products__nav">
        <Link className="products__home" to={'/'}>
          <img src={home} className="img" alt="" />
        </Link>
        <img src={arrowRight} alt="arrowRight" />
        <p className="products__pathname">
          {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
        </p>
      </div>
      <div className="products__title">
        <h1 className="products__h1">Mobile phones</h1>
        <p className="products__subtitle">{products.length} models</p>
      </div>
      <div className="products__container">
        <div className="products__sort-fields">
          <div className="products__sort-field" ref={dropdownRefSort}>
            <p className="products__sort-field-text">Sort by</p>
            <button
              className={classNames("products__dropdown", {
                "products__dropdown-active": showSortDropdown,
              })}
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <div className="products__dropdown-text">
                {sortBy || 'Choose sort'}
              </div>
              <img hidden={!showSortDropdown} src={arrowUp} alt="" />
              <img hidden={showSortDropdown} src={arrowDown} alt="" />
            </button>
            {showSortDropdown && (
              <ul className="products__dropdown-menu">
                {sortType.map(option => (
                  <SearchLink
                    className='products__option'
                    onClick={() => {
                      setShowSortDropdown(false);
                    }}
                    key={option}
                    params={{ sortBy: `${option}` }}
                  >
                    {option}
                  </SearchLink>
                ))}
              </ul>
            )}
          </div>
          <div className="products__sort-field" ref={dropdownRefPerPage}>
            <p className="products__sort-field-text">Items on page</p>
            <button
              className={classNames("products__dropdown", {
                "products__dropdown-active": showPerPageDropdown,
              })}
              onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
            >
              <div className="products__dropdown-text">{perPage || 'all'}</div>
              <img hidden={!showPerPageDropdown} src={arrowUp} alt="" />
              <img hidden={showPerPageDropdown} src={arrowDown} alt="" />
            </button>
            {showPerPageDropdown && (
              <ul className="products__dropdown-menu">
                {perPageOptions.map(option => (
                  <SearchLink
                    className='products__option'
                    onClick={() => {
                      setShowPerPageDropdown(false);
                    }}
                    key={option}
                    params={{
                      perPage: option !== 'all' ? `${option}` : null,
                      page:
                        option === 'all'
                          ? null
                          : currentPage === '1'
                            ? null
                            : currentPage,
                    }}
                  >
                    {option}
                  </SearchLink>
                ))}
              </ul>
            )}
          </div>
        </div>
        <Catalog products={productsToRender()} />
      </div>
      {perPage !== 'all' && (
        <div className="products__buttons">
          <button
            disabled={+currentPage === 1}
            className={classNames('button-slider b-left button-size', {
              'button-slider__disabled b-left-g': +currentPage === 1,
            })}
            onClick={() => {
              setSearchWith({
                page: currentPage === '2' ? null : `${+currentPage - 1}`,
              });
            }}
          ></button>
          <div className="products__page-buttons">
            {pagesAmmount()
              .map(page => (
                <SearchLink
                  key={page}
                  className={classNames('button-common button-size', {
                    'button-common__active': +currentPage === page,
                  })}
                  params={{ page: page === 1 ? null : `${page}` }}
                >
                  {page}
                </SearchLink>
              ))
              .splice(
                +currentPage === pagesAmmount().length
                  ? buttonsToShow - 1
                  : buttonsToShow,
                4,
              )}
          </div>
          <button
            disabled={+currentPage === pagesAmmount().length}
            className={classNames('button-slider b-right button-size', {
              'button-slider__disabled b-right-g':
                +currentPage === pagesAmmount().length,
            })}
            onClick={() => {
              setSearchWith({ page: `${+currentPage + 1}` });
            }}
          ></button>
        </div>
      )}
    </section>
  );
};
