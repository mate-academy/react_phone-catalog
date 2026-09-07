/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/indent */
import styles from './ProductPage.module.scss';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ProductType } from '../../enums/ProductType';
import { useEffect, useMemo, useState } from 'react';
import productsFromServer from '../../../public/api/products.json';
import { ProductCard } from '../Shared/ProductCard';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';

export const ProductPage = () => {
  const location = useLocation();
  const [productsType, setProductsType] = useState<ProductType | null>(null);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isItemsMenuOpen, setItemsMenuOpen] = useState(false);
  const [paginationButtons, setPaginationButtons] = useState([1, 2, 3, 4]);
  const [activeButtonNum, setActiveButtonNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const page = searchParams.get('page') || '';

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes(ProductType.phones)) {
      setProductsType(ProductType.phones);
    } else if (location.pathname.includes(ProductType.tablets)) {
      setProductsType(ProductType.tablets);
    } else if (location.pathname.includes(ProductType.accessories)) {
      setProductsType(ProductType.accessories);
    }
  }, [location.pathname]);

  const products: Product[] = useMemo(() => {
    return productsFromServer.filter(
      product => product.category === productsType,
    );
  }, [productsType]);

  useEffect(() => {
    setIsSortMenuOpen(false);
    setItemsMenuOpen(false);
  }, [products]);

  const sortedProducts = useMemo(() => {
    const result = products.sort(
      (product1, product2) => product2.year - product1.year,
    );

    if (sort) {
      result.sort((product1, product2) => {
        switch (sort) {
          case 'age':
            return product2.year - product1.year;
          case 'title':
            return product1.name.localeCompare(product2.name);
          case 'price':
            return product1.price - product2.price;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [sort, products]);

  const productsPerPage = useMemo(() => {
    if (
      !(
        perPage === 'all' ||
        perPage === '4' ||
        perPage === '8' ||
        perPage === '16'
      ) ||
      +page <= 0 ||
      +page > Math.ceil(sortedProducts.length / +perPage)
    ) {
      const search = getSearchWith(searchParams, {
        perPage: null,
        page: null,
      });

      setSearchParams(search);

      return [sortedProducts];
    }

    if (!perPage) {
      return [];
    }

    const result = [];

    for (let i = 0; i < sortedProducts.length; i += +perPage) {
      result.push(sortedProducts.slice(i, i + +perPage));
    }

    return result;
  }, [sortedProducts, perPage, page]);

  const currentPageProducts = useMemo(() => {
    return perPage ? productsPerPage[+page - 1] || [] : sortedProducts;
  }, [productsPerPage]);

  useEffect(() => {
    if (!perPage) {
      return;
    }

    const result = [];

    for (let i = 1; i <= productsPerPage.length; i++) {
      result.push(i);
    }

    if (result.length > 4) {
      setPaginationButtons(result.slice(0, 4));
    } else {
      setPaginationButtons(result);
    }
  }, [productsPerPage]);

  useEffect(() => {
    setActiveButtonNum(+page);

    if (+page > paginationButtons[paginationButtons.length - 1]) {
      setPaginationButtons(prevButtons =>
        prevButtons.map(num => num + prevButtons.length),
      );
    } else if (+page < paginationButtons[0]) {
      setPaginationButtons(prevButtons =>
        prevButtons.map(num => num - prevButtons.length),
      );
    }

    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, paginationButtons, productsPerPage]);

  const paginationButtonsCount = useMemo(() => {
    if (
      paginationButtons[paginationButtons.length - 1] > productsPerPage.length
    ) {
      return paginationButtons.slice(
        0,
        paginationButtons.indexOf(productsPerPage.length + 1),
      );
    } else {
      return paginationButtons;
    }
  }, [productsPerPage, paginationButtons]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.productPage}>
          <div className={styles.productPage__top}>
            <Link to={'/'} className={styles.productPage__topHomeIcon} />
            <img
              src="/img/icons/arrow-right-icon.svg"
              alt="arrow-right"
              className={styles.productPage__topArrowIcon}
            />
            <span className={styles.productPage__topText}>
              {productsType &&
                productsType[0].toUpperCase() + productsType.slice(1)}
            </span>
          </div>
          <h1 className={styles.productPage__title}>
            {productsType &&
              (productsType === ProductType.phones
                ? 'Mobile phones'
                : productsType[0].toUpperCase() + productsType.slice(1))}
          </h1>
          <span className={styles.productPage__modelsAmount}>
            {`${products.length} models`}
          </span>

          <div className={styles.productPage__dropDownMenuContainer}>
            <div
              className={classNames(
                styles.productPage__dropDownMenu,
                styles.productPage__sortMenu,
              )}
            >
              <span className={styles.productPage__dropDownMenuLabel}>
                Sort by
              </span>

              <button
                className={styles.productPage__dropDownMenuButton}
                onClick={() => setIsSortMenuOpen(prev => !prev)}
              >
                <span className={styles.productPage__dropDownMenuButtonText}>
                  {!sort || sort === 'age'
                    ? 'Newest'
                    : sort === 'title'
                      ? 'Alphabetically'
                      : 'Cheapest '}
                </span>
                <span className={styles.productPage__dropDownMenuButtonIcon} />
              </button>

              <ul
                className={classNames(styles.productPage__dropDownMenuList, {
                  [styles['productPage__dropDownMenuList--is-active']]:
                    isSortMenuOpen,
                })}
              >
                <li>
                  <Link
                    to={{
                      search: getSearchWith(searchParams, { sort: 'age' }),
                    }}
                    className={styles.productPage__dropDownMenuItem}
                    onClick={() => setIsSortMenuOpen(prev => !prev)}
                  >
                    Newest
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      search: getSearchWith(searchParams, { sort: 'title' }),
                    }}
                    className={styles.productPage__dropDownMenuItem}
                    onClick={() => setIsSortMenuOpen(prev => !prev)}
                  >
                    Alphabetically
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      search: getSearchWith(searchParams, { sort: 'price' }),
                    }}
                    className={styles.productPage__dropDownMenuItem}
                    onClick={() => setIsSortMenuOpen(prev => !prev)}
                  >
                    Cheapest
                  </Link>
                </li>
              </ul>
            </div>

            <div
              className={classNames(
                styles.productPage__dropDownMenu,
                styles.productPage__itemsMenu,
              )}
            >
              <span className={styles.productPage__dropDownMenuLabel}>
                Items on page
              </span>

              <button
                className={styles.productPage__dropDownMenuButton}
                onClick={() => setItemsMenuOpen(prev => !prev)}
              >
                <span className={styles.productPage__dropDownMenuButtonText}>
                  {perPage === 'all' || !perPage ? 'All' : perPage}
                </span>
                <span className={styles.productPage__dropDownMenuButtonIcon} />
              </button>

              <ul
                className={classNames(styles.productPage__dropDownMenuList, {
                  [styles['productPage__dropDownMenuList--is-active']]:
                    isItemsMenuOpen,
                })}
              >
                <li>
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        perPage: '4',
                        page: '1',
                      }),
                    }}
                    className={styles.productPage__dropDownMenuItem}
                    onClick={() => setItemsMenuOpen(prev => !prev)}
                  >
                    4
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        perPage: '8',
                        page: '1',
                      }),
                    }}
                    className={styles.productPage__dropDownMenuItem}
                    onClick={() => setItemsMenuOpen(prev => !prev)}
                  >
                    8
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        perPage: '16',
                        page: '1',
                      }),
                    }}
                    className={styles.productPage__dropDownMenuItem}
                    onClick={() => setItemsMenuOpen(prev => !prev)}
                  >
                    16
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        perPage: null,
                        page: null,
                      }),
                    }}
                    className={styles.productPage__dropDownMenuItem}
                    onClick={() => setItemsMenuOpen(prev => !prev)}
                  >
                    All
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.productPage__productCards}>
            {currentPageProducts.length > 0 ? (
              currentPageProducts.map(product => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <span
                className={styles.productPage__productCardsError}
              >{`There are no ${productsType}`}</span>
            )}
          </div>

          {perPage && (
            <div className={styles.productPage__pagination}>
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    page: `${+page > 1 ? +page - 1 : +page}`,
                  }),
                }}
              >
                <button
                  className={classNames(
                    styles.productPage__paginationSwipeButton,
                    styles.productPage__paginationSwipeButtonLeft,
                  )}
                  disabled={page === '1'}
                />
              </Link>

              <div className={styles.productPage__paginationButtonsContainer}>
                {paginationButtonsCount.map(buttonNum => (
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        page: `${buttonNum}`,
                      }),
                    }}
                    key={buttonNum}
                    className={styles.productPage__paginationButtonLink}
                  >
                    <button
                      className={classNames(
                        styles.productPage__paginationButton,
                        {
                          [styles['productPage__paginationButton--is-active']]:
                            buttonNum === activeButtonNum,
                        },
                      )}
                    >
                      {buttonNum}
                    </button>
                  </Link>
                ))}
              </div>

              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    page: `${+page < productsPerPage.length ? +page + 1 : +page}`,
                  }),
                }}
              >
                <button
                  className={styles.productPage__paginationSwipeButton}
                  disabled={page === `${productsPerPage.length}`}
                />
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};
