import { useEffect, useState } from 'react';
import './PhonesPage.scss';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { ProductCard } from '../ProductCard/ProductCard';
import { getSearchWith } from '../../utils/searchHelper';
import { Pagination } from './Pagination';
import { Product } from '../../types/product';
import { BackLink } from '../BackLink/BackLink';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as productsActions from '../features/ProductsSlicer';
import { Loader } from '../Loader/Loader';
import { SortType } from '../../types/sortType';

const sortBy = ['No sorting', 'Newest', 'Alphabetically', 'Cheapest'];

type ValueType = {
  number: number,
  text: string,
};

export const PhonesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    items: products,
    loaded,
  } = useAppSelector(state => state.products);

  const options = [
    { number: products.length, text: 'All' },
    { number: 4, text: '4' },
    { number: 8, text: '8' },
    { number: 16, text: '16' },
  ];

  const dispatch = useAppDispatch();

  const value = searchParams.get('value') || 'All';
  const perPageParams = searchParams.get('perPage') || '';
  const [perPage, setPerPage] = useState(parseInt(perPageParams, 10));
  const [currentPage, setCurrentPage] = useState(1);
  const [sortProducts, setSortProducts] = useState(sortBy[0]);
  const total = products.length;
  const [selectedOption, setSelectedOption] = useState<string>(value);
  const [isDropActive, setIsDropActive] = useState(false);
  const [isDropSortActive, setIsDropSortActive] = useState(false);

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!products.length) {
      dispatch(productsActions.productsInit());
    }
  }, [dispatch, products]);

  const handlePageChange = (page: number) => {
    setSearchParams(getSearchWith(
      searchParams, { page: page.toString() },
    ));
    setCurrentPage(page);
  };

  const filterProducts = (
    currentSortBy: string,
    productsArray: Product[],
    currentQuery: string,
  ) => {
    let filteredProducts = [...productsArray];

    if (currentQuery.trim()) {
      filteredProducts = [...productsArray].filter(
        (product) => product.name.toLowerCase().includes(
          currentQuery.toLowerCase().trim(),
        ),
      );
    }

    return filteredProducts.sort((a, b) => {
      switch (currentSortBy) {
        case SortType.NoSorting:
          return 0;
        case SortType.Newest:
          return b.year - a.year;
        case SortType.Alphabetically:
          return a.name.localeCompare(b.name);
        case SortType.Cheapest:
          return a.price - b.price;
        default:
          return 0;
      }
    }).slice(
      (currentPage - 1) * perPage, currentPage * perPage,
    );
  };

  const proccesedProducts = filterProducts(sortProducts, products, query);

  const handleSortChange = (sortType: string) => {
    setSearchParams(getSearchWith(
      searchParams, { sortBy: sortType },
    ));
    setSortProducts(sortType);
    setIsDropSortActive(false);
  };

  const handleValueChange = (selectedValue: ValueType) => {
    setSearchParams(getSearchWith(
      searchParams,
      {
        value: selectedValue.text,
        perPage: selectedValue.number.toString(),
      },
    ));
    setPerPage(selectedValue.number);
    setSelectedOption(selectedValue.text);
    setIsDropActive(false);
  };

  const handleDropdown = () => {
    setIsDropActive(!isDropActive);
  };

  const handleDropDownSort = () => {
    setIsDropSortActive(!isDropSortActive);
  };

  useEffect(() => {
    const selectedValue
    = parseInt(searchParams.get('perPage') || products.length.toString(), 10);

    setPerPage(selectedValue);
  }, [searchParams, products.length]);

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get('page') || '1', 10);

    setCurrentPage(pageFromParams);
  }, [searchParams, proccesedProducts]);

  useEffect(() => {
    const selectedSort = searchParams.get('sortBy') || sortProducts;

    setSortProducts(selectedSort);
  }, [searchParams, proccesedProducts, sortProducts]);

  return (
    <div className="phones">
      {query && (
        <div>
          {proccesedProducts.length > 0 && (
            <h3 className="phones__subtitle">
              {proccesedProducts.length === 1 ? (
                (`${proccesedProducts.length} result`)
              ) : (
                (`${proccesedProducts.length} results`)
              )}
            </h3>
          )}
          {!proccesedProducts.length && (
            !loaded && (
              <h1 className="phones__title">
                there are no products matching your requests
              </h1>
            )
          )}
          {proccesedProducts.length > 0
            && (
              <div className="phones__list">
                {loaded && <Loader />}
                {!loaded && proccesedProducts.length > 0
                && proccesedProducts.map((product: Product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            )}
        </div>
      )}
      {!query && (
        <div className="phones-container">
          <BackLink text="Phones" />
          <h1 className="phones__title">Page with phones</h1>
          <h3 className="phones__subtitle">{`${products?.length} models`}</h3>
          <div className="phones__main-container">
            <div className="phones-container">
              <h1 className="phones__subtitle phones__subtitle_little">
                Sort by
              </h1>
              <div className="phones__select">
                <div
                  role="button"
                  className="phones__option-container"
                  onClick={handleDropDownSort}
                  aria-hidden="true"
                >
                  <span className="phones__option-selected">
                    {sortProducts}
                  </span>
                  <div className={cn('phones__option-arrow',
                    { 'phones__option-arrow_focus': isDropSortActive })}
                  />
                </div>
                {isDropSortActive && (
                  <ul
                    className="phones__option__list"
                  >
                    {sortBy.map((sort) => (
                      <li
                        className={cn('phones__option',
                          { 'phones__option-active': sort === sortProducts })}
                        key={sort}
                        value={sort}
                        onClick={() => {
                          handleSortChange(sort);
                        }}
                        aria-hidden="true"
                      >
                        {sort}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="phones-container">
              <h1 className="phones__subtitle phones__subtitle_little">
                Items on page
              </h1>
              <div
                className="phones__select"
                aria-hidden="true"
              >
                <div
                  role="button"
                  className="phones__option-container"
                  onClick={handleDropdown}
                  aria-hidden="true"
                >
                  <span className="phones__option-selected">
                    {selectedOption}
                  </span>
                  <div
                    className={cn('phones__option-arrow',
                      { 'phones__option-arrow_focus': isDropActive })}
                  />
                </div>
                {isDropActive && (
                  <ul
                    className="phones__option__list"
                  >
                    {options.map((option) => (
                      <li
                        className={cn('phones__option',
                          {
                            'phones__option-active':
                            option.text === selectedOption,
                          })}
                        key={option.number}
                        value={option.number}
                        onClick={() => {
                          handleValueChange(option);
                        }}
                        aria-hidden="true"
                      >
                        {option.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <ul className="phones__list">
            {loaded && <Loader />}
            {!loaded && proccesedProducts.map((product: Product) => (
              <li className="phones__item" key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          {!query && proccesedProducts.length > 0
          && perPage !== options[0].number && (
            <Pagination
              total={total}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};
