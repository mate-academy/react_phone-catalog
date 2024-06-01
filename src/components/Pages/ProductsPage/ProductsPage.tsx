/* eslint-disable @typescript-eslint/ban-ts-comment */
import './ProductsPage.scss';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  PerPage,
  Product,
  SearchParams,
  SortType,
  PageTitles,
  ProductCategory,
} from '../../../types/types';
import { ProductCard } from '../../ProductCard';
import { Link, useSearchParams } from 'react-router-dom';
import { ScrollToTop } from '../../../utils/scrollWindowTop';
import { NavigationPath } from '../../NavigationPath';
import { getNumbers } from '../../../utils/getNumbers';
import { getSearchWith } from '../../../utils/getSearchWith';
import { getSortedProducts } from '../../../utils/getSortedProducts';
import { findProduct } from '../../../utils/findProduct';
import { getProducts } from '../../../api';
import { getProductsByCategory } from '../../../utils/getProductsByCategory';
import { images } from '../../../images';
import { ProductCardSkeleton } from '../../skeletons/ProductCardSkeleton';

type Props = {
  category: ProductCategory;
  title: PageTitles;
};

export const ProductsPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = +(searchParams.get('perPage') || products.length);
  const currentPage = +(searchParams.get('page') || 1);
  const query = searchParams.get('query') || '';
  const arraySort = (searchParams.get('sort') || SortType.Default) as SortType;
  const filteredProducts = findProduct(products, query);

  const itemCount = filteredProducts.length;
  const start = (currentPage - 1) * itemsPerPage;
  const end = Math.min(currentPage * itemsPerPage, itemCount);
  const pagesCount = Math.ceil(itemCount / itemsPerPage);
  const pages = getNumbers(1, pagesCount);

  const itemWidth = 32;
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const sortTypeArr = [
    SortType.Default,
    SortType.Newest,
    SortType.Alphabetically,
    SortType.Cheapest,
  ];

  const PerPageArr = [
    products.length,
    PerPage.Four,
    PerPage.Eight,
    PerPage.Sixteen,
  ];

  const [buttonPerPage, setButtonPerPage] = useState(false);
  const [buttonSortBy, setButtonSortBy] = useState(false);
  const dropdownPageRef = useRef<HTMLDivElement>(null);
  const dropdownSortRef = useRef<HTMLDivElement>(null);
  const buttonPageRef = useRef<HTMLDivElement>(null);
  const buttonSortRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;

    if (
      dropdownSortRef.current &&
      !dropdownSortRef.current.contains(target) &&
      buttonSortRef.current &&
      !buttonSortRef.current.contains(target)
    ) {
      setButtonSortBy(false);
    }

    if (
      dropdownPageRef.current &&
      !dropdownPageRef.current.contains(target) &&
      buttonPageRef.current &&
      !buttonPageRef.current.contains(target)
    ) {
      setButtonPerPage(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handlePrevClick = useCallback(() => {
    if (currentPage <= pagesCount - 2 && currentPage > 3) {
      setCurrentTranslate(currentTranslate + itemWidth + 8);
    }
  }, [currentPage, currentTranslate, pagesCount]);

  const handleNextClick = useCallback(() => {
    if (currentPage < pagesCount - 2 && currentPage >= 3) {
      setCurrentTranslate(currentTranslate - itemWidth - 8);
    }
  }, [currentPage, currentTranslate, pagesCount]);

  const handlePageClick = useCallback(
    (newPage: number) => {
      const targetPage = Math.min(Math.max(newPage, 3), pagesCount - 2);

      setCurrentTranslate(
        pagesCount < 5 ? 0 : (targetPage - 3) * -(itemWidth + 8),
      );
    },
    [pagesCount],
  );

  useEffect(() => {
    document.title = `${title} - Nice Gadgets (UA)`;
  }, [title]);

  useEffect(() => {
    handlePageClick(currentPage);
  }, [category, currentPage, handlePageClick]);

  useEffect(() => {
    setIsLoader(true);
    getProducts()
      .then(prod => setProducts(getProductsByCategory(prod, category)))
      .finally(() => setIsLoader(false));
  }, [category]);

  const getProductsForPage = (productes: Product[]) =>
    productes.slice(start, end);

  const setSearchWith = useCallback(
    (params: SearchParams) => {
      const search = getSearchWith(searchParams, params);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const handlePerPageChange = useCallback(
    (perPage: PerPage | number) => {
      ScrollToTop();

      setSearchWith({
        perPage: +perPage === itemCount ? null : perPage.toString(),
        page: +perPage === itemCount ? null : `${1}`,
      });

      setButtonPerPage(false);
    },
    [itemCount, setSearchWith],
  );

  const handleSortChange = useCallback(
    (sortBy: SortType) => {
      ScrollToTop();

      setSearchWith({
        page: itemsPerPage === itemCount ? null : `${1}`,
        sort: sortBy === SortType.Default ? null : sortBy,
      });

      setButtonSortBy(false);
    },
    [itemCount, itemsPerPage, setSearchWith],
  );

  const handlePageChange = useCallback(
    (currentSearchParams: URLSearchParams, page: number) => {
      if (page !== currentPage && page >= 1 && page <= pagesCount) {
        window.scrollTo({ top: 0 });

        return getSearchWith(currentSearchParams, { page: `${page}` });
      }

      return currentSearchParams.toString();
    },
    [currentPage, pagesCount],
  );

  return (
    <main className="productsPage">
      <div className="container">
        <NavigationPath />

        <div className="productsPage__titleBlock">
          <h1>{title}</h1>
          <p className="productsPage__titleBlock--productCounter bodyText">
            {itemCount} models
          </p>
        </div>
        <div className="productsPage__productsBlock">
          <div
            className="
              productsPage__productsBlock--selectProducts selectProducts
            "
          >
            <div className="custom-select">
              <label
                htmlFor="SortBy"
                className="smallText custom-select__titles"
              >
                Sort by
              </label>
              <div
                className="custom-select__buttonSort"
                onClick={() => setButtonSortBy(buttonSortBy ? false : true)}
                ref={buttonSortRef}
              >
                <div className="custom-select__text">{arraySort}</div>
                <img
                  src={images.arrowPath}
                  alt="arrowUp"
                  className={classNames('custom-select__arrow', {
                    'custom-select__arrow-rotate': buttonSortBy,
                  })}
                />
              </div>
              <div
                className={classNames('custom-select__options', {
                  'custom-select__options--active': buttonSortBy,
                })}
                ref={dropdownSortRef}
              >
                {sortTypeArr.map(
                  option =>
                    option !== arraySort && (
                      <div
                        key={option}
                        className="custom-select__option bodyText"
                        onClick={() => handleSortChange(option)}
                      >
                        {option}
                      </div>
                    ),
                )}
              </div>
            </div>

            <div className="custom-select">
              <label
                htmlFor="ItemsOnPage"
                className="smallText custom-select__titles"
              >
                Items on page
              </label>
              <div
                className="custom-select__buttonPerPage"
                onClick={() => setButtonPerPage(buttonPerPage ? false : true)}
                ref={dropdownPageRef}
              >
                <div className="custom-select__text">
                  {itemsPerPage === products.length ? 'All' : itemsPerPage}
                </div>
                <img
                  src={images.arrowPath}
                  alt="arrowUp"
                  className={classNames('custom-select__arrow', {
                    'custom-select__arrow-rotate': buttonPerPage,
                  })}
                />
              </div>
              <div
                className={classNames('custom-select__options', {
                  'custom-select__options--active': buttonPerPage,
                })}
                ref={buttonPageRef}
              >
                {PerPageArr.map(
                  option =>
                    option !== itemsPerPage && (
                      <div
                        key={option}
                        className="custom-select__option bodyText"
                        onClick={() => handlePerPageChange(option)}
                      >
                        {option === products.length ? 'All' : option}
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>

          {isLoader && (
            <div className="productsPage__productsBlock--loader">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          )}

          {!isLoader && (
            <>
              {!isLoader && !!products.length && !filteredProducts.length ? (
                <h2>{`The are no products matching your search :(`}</h2>
              ) : (
                <div className="productsPage__ProductsBlock--Products products">
                  <ul className="products__list">
                    {getProductsForPage(
                      getSortedProducts(filteredProducts, arraySort),
                    ).map(product => (
                      <ProductCard
                        key={product.itemId}
                        product={product}
                        translate={null}
                      />
                    ))}
                  </ul>
                </div>
              )}

              {itemsPerPage !== itemCount && filteredProducts.length > 0 && (
                <div
                  className="
                    productsPage_productsBlock--pagination
                    pagination
                  "
                >
                  <Link
                    to={{
                      search: handlePageChange(searchParams, currentPage - 1),
                    }}
                    className={classNames('pagination__prev', {
                      'pagination__link--disabled': currentPage === 1,
                    })}
                    aria-disabled={currentPage === 1 && 'true'}
                    onClick={handlePrevClick}
                  >
                    <img
                      src={images.sliderButton}
                      alt="arrows"
                      className="pagination__img"
                    />
                  </Link>

                  <ul
                    className={classNames('pagination__list', {
                      'pagination__list--fix': pagesCount < 5,
                    })}
                  >
                    {pages.map(page => (
                      <Link
                        style={{
                          transform: `translateX(${currentTranslate}px)`,
                        }}
                        key={page}
                        to={{ search: handlePageChange(searchParams, page) }}
                        className={classNames('pagination__pages bodyText', {
                          'pagination__link--active': currentPage === page,
                        })}
                        onClick={() => handlePageClick(page)}
                      >
                        {page}
                      </Link>
                    ))}
                  </ul>

                  <Link
                    to={{
                      search: handlePageChange(searchParams, currentPage + 1),
                    }}
                    className={classNames('pagination__next', {
                      'pagination__link--disabled': currentPage === pagesCount,
                    })}
                    aria-disabled={currentPage === pagesCount && 'true'}
                    onClick={handleNextClick}
                  >
                    <img
                      src={images.sliderButton}
                      alt="arrows"
                      className="pagination__img"
                    />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};
