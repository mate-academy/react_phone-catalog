/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import { Sort } from '../../types/Sort';

import { getUniqueId } from '../../helpers/getFunctions/getUniqueld';
import { SearchParams, getSearchWith }
  from '../../helpers/getFunctions/searchHelper';
import { getPreparitionProducts }
  from '../../helpers/getFunctions/getPreparitionProducts';

import { NavMap } from '../NavMap';
import './ProductsCatalog.scss';
import { ProductsList } from '../ProductsList';
import { NoResult } from '../NoResult';

type Props = {
  products: Product[],
  title: string,
};

const optionsSort = ['Newest', 'Name', 'Cheapest'];
const optionsItemsNumber = ['16', '8', '4', 'All'];

export const ProductsCatalog: React.FC<Props> = ({ products, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const sort = (searchParams.get('sort') as Sort) || 'age';
  const itemsNumber = searchParams.get('itemsOnPage') || '16';
  const page = searchParams.get('page') || '1';

  const [sortLabel, setSortLabel] = useState('Newest');

  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenItems, setIsOpenItems] = useState(false);

  const countPages = Math.ceil(products.length / +itemsNumber)
    || false;

  const getVisblePages = () => {
    const pages: number[] = [];

    if (!countPages) {
      return pages;
    }

    for (let i = 1; i <= countPages; i += 1) {
      pages.push(i);
    }

    if (+page >= 4 && +page !== pages.length) {
      return pages.slice(+page - 3, +page + 1);
    }

    if (+page === pages.length) {
      return pages.slice(pages.length - 4, pages.length);
    }

    return pages.slice(0, 4);
  };

  const handleBtnSort = () => {
    setIsOpenSort(!isOpenSort);
  };

  const handleSelectSort = (option: string) => {
    const params: {
      sort?: string;
      page?: string;
    } = {};

    if (option === 'Cheapest') {
      params.sort = 'price';
    } else if (option === 'Name') {
      params.sort = 'name';
    } else {
      params.sort = 'name';
    }

    params.page = '1';

    setSearchWith(params);
    setSortLabel(option);
    setIsOpenSort(false);
  };

  const handleBtnItemsNumber = () => {
    setIsOpenItems(!isOpenItems);
  };

  const handleSelectItemsNumber = (option: string) => {
    setSearchWith({
      itemsOnPage: option,
      page: '1',
    });

    setIsOpenItems(false);
  };

  const toTopPage = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleBtnPrevPage = () => {
    setSearchWith({ page: `${+page - 1}` });
    toTopPage();
  };

  const handleBtnNextPage = () => {
    setSearchWith({ page: `${+page + 1}` });
    toTopPage();
  };

  const handleBtnPage = (currentPage: number) => {
    setSearchWith({ page: `${currentPage}` });
    toTopPage();
  };

  const visblePages = getVisblePages();
  const visibleProducts = getPreparitionProducts(products, searchParams);

  return (
    <div className="products-catalog">

      <div className="products-catalog__header">
        <NavMap />

        <h1 className="products-catalog__title">
          {title}
        </h1>

        <p className="products-catalog__subtitle">
          {`${products.length} models`}
        </p>
      </div>

      {products.length ? (
        <>
          <div className="products-catalog__search-panel">
            <div className="products-catalog__btn-wrapper">
              <p className="products-catalog__btn-label">
                Sort by
              </p>
              <button
                onMouseDown={handleBtnSort}
                onBlur={() => setIsOpenSort(false)}
                className="products-catalog__btn button"
              >
                <div
                  className="
                products-catalog__btn-value
                products-catalog__btn-value--sort
              "
                >
                  {sortLabel}
                </div>

                <div className={classNames('icon', {
                  'icon__arrow-secondary': !isOpenSort,
                  'icon__arrow-primary icon__arrow-primary--top': isOpenSort,
                })}
                />
              </button>

              {isOpenSort && (
                <ul className="products-catalog__dropdown-menu">
                  {optionsSort.map((option) => (
                    <li
                      key={getUniqueId()}
                      className="products-catalog__dropdown-menu-item"
                    >
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectSort(option);
                        }}
                        className="products-catalog__btn-option"
                      >
                        <div className={classNames(
                          'products-catalog__option-value',
                          {
                            'products-catalog__option-value--selected':
                              option === sort,
                          },
                        )}
                        >
                          {option}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="products-catalog__btn-wrapper">
              <p className="products-catalog__btn-label">
                Items on page
              </p>
              <button
                onMouseDown={handleBtnItemsNumber}
                onBlur={() => setIsOpenItems(false)}
                className="products-catalog__btn button"
              >
                <div
                  className="
                products-catalog__btn-value
                products-catalog__btn-value--itemsNumber
              "
                >
                  {itemsNumber}
                </div>

                <div className={classNames('icon', {
                  'icon__arrow-secondary': !isOpenItems,
                  'icon__arrow-primary icon__arrow-primary--top': isOpenItems,
                })}
                />
              </button>

              {isOpenItems && (
                <ul className="products-catalog__dropdown-menu">
                  {optionsItemsNumber.map((option) => (
                    <li
                      key={getUniqueId()}
                      className="products-catalog__dropdown-menu-item"
                    >
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectItemsNumber(option);
                        }}
                        className="products-catalog__btn-option"
                      >
                        <div className={classNames(
                          'products-catalog__option-value',
                          {
                            'products-catalog__option-value--selected':
                              option === itemsNumber,
                          },
                        )}
                        >
                          {option}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <ProductsList
            products={visibleProducts}
            data-cy="productList"
          />

          {
            countPages && (
              <div className="products-catalog__page-controls">
                <button
                  onClick={handleBtnPrevPage}
                  className={classNames(
                    'products-catalog__btn-control-page',
                    'button',
                    { 'button--disable': +page === 1 },
                  )}
                  disabled={+page === 1}
                >
                  <div className="icon icon__arrow-primary" />
                </button>

                <ul className="products-catalog__pages-list">
                  {visblePages.map(pageValue => (
                    <li
                      key={getUniqueId()}
                      className="products-catalog__page-item"
                    >
                      <button
                        onClick={() => handleBtnPage(pageValue)}
                        className={classNames(
                          'products-catalog__btn-page',
                          'button',
                          {
                            'products-catalog__btn-page--active':
                              +page === pageValue,
                          },
                        )}
                      >
                        {pageValue}
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleBtnNextPage}
                  className={classNames(
                    'products-catalog__btn-control-page',
                    'button',
                    { 'button--disable': +page === countPages },
                  )}
                  disabled={countPages === +page}
                >
                  <div
                    className="
                      icon icon__arrow-primary
                      icon__arrow-primary--rigth
                    "
                  />
                </button>
              </div>
            )
          }
        </>
      ) : (
        <NoResult />
      )}
    </div>
  );
};
