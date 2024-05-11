import React, { useEffect, useState } from 'react';
import './ProductsPage.scss';

import { Product } from '../../types/products';
import { getProducts } from '../../utils/api';
import {
  adaptivePaginationPages,
  // getProductsPhones,
  scrollOnTop,
} from '../../utils';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPrepearedProducts } from '../../utils/getPrepearedProducts';
// import { ProductExtended } from '../../types/productExtended';

const OnPageOption = ['8', '12', '24', 'All'];

enum SortByOption {
  NewFirst = 'New first',
  OldFirst = 'Old first',
  BiggerPrice = 'Price: High to Low',
  SmallerPrice = 'Price: Low to High',
}

type Props = {
  type: string;
};

export const ProductsPage: React.FC<Props> = ({ type }) => {

  const [phones, setPhones] = useState<Product[]>([]);
  const [visiblePhones, setVisiblePhones] = useState<Product[]>([]);
  const [query, setQuery] = useState('');

  const [sortBy, setSortBy] = useState(SortByOption.NewFirst);
  const [onPage, setOnPage] = useState(OnPageOption[0]);
  const [sortByDropdownActive, setSortByDropdownActive] = useState(false);
  const [onPageDropdownActive, setOnPageDropdownActive] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const onPageParam = searchParams.get('onPage') || 8;
  const pageParam = searchParams.get('page') || 1;
  const sortParam = searchParams.get('sortBy') || null;
  const queryParam = searchParams.get('query') || '';

  useEffect(() => {
    getProducts().then(products => {
      setPhones(products.filter(product => product.category === type));
    });
  }, [setPhones, type]);

  useEffect(() => {
    const allPhones = getPrepearedProducts(phones, searchParams);

    if (!Number.isNaN(+onPageParam)) {
      const visibleOnPagePhones = allPhones.slice(
        (+pageParam - 1) * +onPageParam,
        +pageParam * +onPageParam,
      );

      setVisiblePhones(visibleOnPagePhones);
    } else {
      setVisiblePhones(allPhones);
    }
  }, [phones, searchParams, onPageParam, pageParam]);

  useEffect(() => {
    if (!sortParam) {
      setSortBy(SortByOption.NewFirst);
    }

    if (onPageParam === 8) {
      setOnPage(OnPageOption[0]);
    }

    if (!queryParam) {
      setQuery('');
    }
  }, [sortParam, onPageParam, queryParam]);

  const amountOfPages = () => {
    const result = Math.ceil(
      getPrepearedProducts(phones, searchParams).length / +onPage,
    );

    return Array.from({ length: result }, (_, index) => index + 1);
  };

  const handleSortByChange = (value: SortByOption) => {
    setSortBy(value);

    const params = new URLSearchParams(searchParams);

    switch (value) {
      case SortByOption.OldFirst:
        params.set('sortBy', 'new');
        params.set('order', 'desc');
        break;
      case SortByOption.BiggerPrice:
        params.set('sortBy', 'price');
        params.set('order', 'desc');
        break;
      case SortByOption.SmallerPrice:
        params.set('sortBy', 'price');
        params.delete('order');
        break;
      default:
        params.delete('sortBy');
        params.delete('order');
        break;
    }

    params.set('page', '1');
    setSearchParams(params);
  };

  const handleOnPageChange = (value: string) => {
    setOnPage(value);
    const params = new URLSearchParams(searchParams);

    params.set('onPage', value.toLowerCase());
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value.trim());
    }

    setSearchParams(params);
  };

  const handlePrevPageChange = () => {
    const params = new URLSearchParams(searchParams);

    params.set('page', (+pageParam - 1).toString());

    setSearchParams(params);

    scrollOnTop();
  };

  const handleNextPageChange = () => {
    const params = new URLSearchParams(searchParams);

    params.set('page', (+pageParam + 1).toString());

    setSearchParams(params);

    scrollOnTop();
  };

  const handlePageChange = (currentPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', currentPage.toString());

    setSearchParams(params);

    scrollOnTop(200);
  };

  // return phoneId ? (
  return (
    // <PhonePage />
    // ) : (
    <div className="mobile-phones">
      <div className="history-path">
        <Link to="/">
          <div className="icon icon-home" />
        </Link>
        <div className="icon icon-arrow" />
        <Link to="/phones" className="current-page-name">
          Phones
        </Link>
      </div>
      <h1 className="mobile-phones__title">Mobile phones</h1>
      <div className="mobile-phones__amount">{`${phones.length} models`}</div>

      <div className="moble-phones__filter">
        <div className="filter__sort-by dropdown dropdown-active">
          <div className="filter__label label">Sort By</div>

          <button
            className="filter__select select select-active1"
            onClick={() => setSortByDropdownActive(prev => !prev)}
            onBlur={() => setTimeout(() => setSortByDropdownActive(false), 400)}
          >
            <div className="select-text">{sortBy}</div>
            <div
              className={classNames('select-icon', {
                'select-icon-active': sortByDropdownActive,
              })}
            />
          </button>

          <div
            className={classNames('filter__select-dropdown dropdown__content', {
              'dropdown-active': sortByDropdownActive,
            })}
          >
            <div className="dropdown__items">
              {Object.entries(SortByOption).map(([key, value]) => (
                <div
                  key={key}
                  className="dropdown__item"
                  onClick={() => handleSortByChange(value)}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="filter__on-page dropdown dropdown-active">
          <div className="filter__label label">On page</div>

          <button
            className="filter__select select select-active1"
            onClick={() => setOnPageDropdownActive(prev => !prev)}
            onBlur={() => setTimeout(() => setOnPageDropdownActive(false), 400)}
          >
            <div className="select-text">{onPage}</div>
            <div
              className={classNames('select-icon', {
                'select-icon-active': onPageDropdownActive,
              })}
            />
          </button>

          <div
            className={classNames('filter__select-dropdown dropdown__content', {
              'dropdown-active': onPageDropdownActive,
            })}
          >
            <div className="dropdown__items">
              {OnPageOption.map(value => (
                <div
                  key={value}
                  className="dropdown__item"
                  onClick={() => handleOnPageChange(value)}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>

        <input
          className="filter__search"
          type="search"
          placeholder="search"
          value={query}
          onChange={handleQueryChange}
          onBlur={() => setQuery(query.trim())}
        />
      </div>

      <div className="mobile-phones__container">
        <div className="mobile-phones__cards">
          {visiblePhones.map(phone => {
            const {
              itemId,
              image,
              name,
              price,
              fullPrice,
              screen,
              capacity,
              ram,
            } = phone;

            return (
              <Link to={`/phones/${itemId}`} key={itemId} className="card-link">
                <div className="card" key={itemId}>
                  <img className="card__image" src={image} alt={itemId} />

                  <div className="card__title">{name}</div>

                  <div className="card__discount">
                    <div className="discount__new-price">{`$${price}`}</div>
                    <div className="discount__old-price">{`$${fullPrice}`}</div>
                  </div>

                  <div className="card__characteristics">
                    <div className="card__discription">
                      <span className="discription__title">Screen</span>
                      <span className="description__value">{screen}</span>
                    </div>
                    <div className="card__discription">
                      <span className="discription__title">Capacity</span>
                      <span className="description__value">{capacity}</span>
                    </div>
                    <div className="card__discription">
                      <span className="discription__title">RAM</span>
                      <span className="description__value">{ram}</span>
                    </div>
                  </div>

                  <div className="card__buttons">
                    <a href="#" className="button__add">
                      Add to card
                    </a>
                    <a href="#" className="card-button__favourite">
                      <img src="./img/icons-image/heart_empty.svg" alt="" />
                    </a>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {!Number.isNaN(+onPage) && amountOfPages().length > 1 && (
          <ul className="mobile-phones__pagination-pages">
            <button
              disabled={+pageParam === amountOfPages()[0]}
              className={classNames('pagination__prev pagination-button', {
                'pagination__prev-disabled': +pageParam === amountOfPages()[0],
              })}
              onClick={handlePrevPageChange}
            />

            {adaptivePaginationPages(amountOfPages(), +pageParam).map(
              (page, index) =>
                page !== '...' ? (
                  <button
                    className={classNames(
                      'pagination__page pagination-button',
                      {
                        pagination__active: +pageParam === page,
                      },
                    )}
                    key={`pageIS${page}`}
                    onClick={() => handlePageChange(+page)}
                  >
                    {page}
                  </button>
                ) : (
                  <div className="pagination__darks" key={`${page}${index}`}>
                    {page}
                  </div>
                ),
            )}

            <button
              disabled={
                +pageParam === amountOfPages()[amountOfPages().length - 1]
              }
              className={classNames('pagination__next pagination-button', {
                'paginaton__next-disabled':
                  +pageParam === amountOfPages()[amountOfPages().length - 1],
              })}
              onClick={handleNextPageChange}
            />
          </ul>
        )}
      </div>
    </div>
  );
};
