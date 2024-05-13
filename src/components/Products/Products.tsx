import React, { useEffect, useState } from 'react';
import styles from './product.module.scss';
import 'bulma/css/bulma.min.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { ProductType } from '../../services/enums';
import Loader from '../Loader/Spiner';
import { Pagination } from '../Pangination/Pangination';
import { Sort, getSortedProducts } from '../../functions/sorted';
import { useLocalStorage } from '../../local/localStorege';
import { loadProducts, loadProductsDetail } from '../../feachers/productSlice';
import { Theme } from '../../services/theme';

type Props = {
  type: ProductType;
  title: string;
};

export const Products: React.FC<Props> = ({ type, title }) => {
  const [perPage, setPerPage] = useState(16);
  const [sorted, setSorted] = useState<Sort>(Sort.newest);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isDropdown, setIsDrobdown] = useState(false);
  const [isDropdownSorted, setIsDrobdownSorted] = useState(false);

  const products = useAppSelector(state => state.phones.products);
  const load = useAppSelector(state => state.phones.isLoading);
  const theme = useAppSelector(state => state.theme.theme);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleProducts, setVisibleProducts] = useLocalStorage(
    'visibleProducts',
    getSortedProducts(products, sorted),
  );

  //Pangination
  const itemsToPrint = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalItems);

    return visibleProducts.slice(startIndex, endIndex);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);

    setSearchParams(`page ${page}`);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(visibleProducts.length / perPage));
    setTotalItems(visibleProducts.length);
  }, [visibleProducts, perPage]);
  // end-pangination

  useEffect(() => {
    dispatch(loadProducts(type));
    dispatch(loadProductsDetail(type));
  }, [type]);

  const drobdownHandler = () => {
    setIsDrobdown(prev => !prev);
  };

  const sortDrobdownHandler = () => {
    setIsDrobdownSorted(prev => !prev);
  };

  useEffect(() => {
    setVisibleProducts(getSortedProducts(products, sorted));
  }, [sorted, products]);

  const handlerSortedProduct = (sort: Sort) => {
    setSorted(sort);
  };

  useEffect(() => {
    searchParams.set('sort', sorted);
    searchParams.set('items', String(perPage));
    setSearchParams(searchParams);
  }, [searchParams]);

  return (
    <>
      <Header />
      <div
        className={
          theme === Theme.light ? styles.background : styles.backgroundDark
        }
      >
        <section className={styles.mobilePhones}>
          <div className={styles.homeLinkContainer}>
            <NavLink to={'/'}>
              <svg
                className={styles.home}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M7.59087 0.80718C7.83161 0.619937 8.16872 0.619937 8.40946 0.80718L14.4095 5.47385C14.5718 5.60015 14.6668 5.79435 14.6668 6.00008V13.3334C14.6668 13.8638 14.4561 14.3726 14.081 14.7476C13.706 15.1227 13.1973 15.3334 12.6668 15.3334H3.3335C2.80306 15.3334 2.29436 15.1227 1.91928 14.7476C1.54421 14.3726 1.3335 13.8638 1.3335 13.3334V6.00008C1.3335 5.79435 1.42848 5.60015 1.59087 5.47385L7.59087 0.80718ZM2.66683 6.32614V13.3334C2.66683 13.5102 2.73707 13.6798 2.86209 13.8048C2.98712 13.9298 3.15669 14.0001 3.3335 14.0001H12.6668C12.8436 14.0001 13.0132 13.9298 13.1382 13.8048C13.2633 13.6798 13.3335 13.5102 13.3335 13.3334V6.32614L8.00016 2.17799L2.66683 6.32614Z"
                  fill={theme === Theme.light ? '#0F0F11' : '#F1F2F9'}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M5.3335 7.99992C5.3335 7.63173 5.63197 7.33325 6.00016 7.33325H10.0002C10.3684 7.33325 10.6668 7.63173 10.6668 7.99992V14.6666C10.6668 15.0348 10.3684 15.3333 10.0002 15.3333C9.63197 15.3333 9.3335 15.0348 9.3335 14.6666V8.66659H6.66683V14.6666C6.66683 15.0348 6.36835 15.3333 6.00016 15.3333C5.63197 15.3333 5.3335 15.0348 5.3335 14.6666V7.99992Z"
                  fill={theme === Theme.light ? '#0F0F11' : '#F1F2F9'}
                />
              </svg>
            </NavLink>
            <svg
              className={styles.arrow}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M5.52876 3.52851C5.78911 3.26816 6.21122 3.26816 6.47157 3.52851L10.4716 7.52851C10.7319 7.78886 10.7319 8.21097 10.4716 8.47132L6.47157 12.4713C6.21122 12.7317 5.78911 12.7317 5.52876 12.4713C5.26841 12.211 5.26841 11.7889 5.52876 11.5285L9.05735 7.99992L5.52876 4.47132C5.26841 4.21097 5.26841 3.78886 5.52876 3.52851Z"
                fill={theme === Theme.light ? '#0F0F11' : '#F1F2F9'}
              />
            </svg>
            <NavLink to={'/phones'}>
              <span
                className={
                  theme === Theme.light ? styles.phones : styles.phonesDark
                }
              >
                {title}
              </span>
            </NavLink>
          </div>
          <div className={styles.titleAndMpdels}>
            <h1
              className={
                theme === Theme.light
                  ? styles.phoneTitle
                  : styles.phoneTitleDark
              }
            >
              {title}
            </h1>
            <span className={styles.models}>{products.length} models</span>
          </div>
          <div className={styles.filters}>
            <div className={styles.selectAndSortBy}>
              <span className={styles.selectDescription}>Sort by</span>
              <div className={styles.selectAndItemsPage}>
                <div
                  className={
                    theme === Theme.light
                      ? styles.customSelectSortBy
                      : styles.customSelectSortByDark
                  }
                  onClick={sortDrobdownHandler}
                >
                  <span
                    className={
                      theme === Theme.light
                        ? styles.selectItem
                        : styles.selectItemDark
                    }
                  >
                    {sorted}
                  </span>
                  <svg
                    className={styles.selectIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      // eslint-disable-next-line max-len
                      d="M12.4717 5.52876C12.7321 5.78911 12.7321 6.21122 12.4717 6.47157L8.47173 10.4716C8.21138 10.7319 7.78927 10.7319 7.52892 10.4716L3.52892 6.47157C3.26857 6.21122 3.26857 5.78911 3.52892 5.52876C3.78927 5.26841 4.21138 5.26841 4.47173 5.52876L8.00033 9.05735L11.5289 5.52876C11.7893 5.26841 12.2114 5.26841 12.4717 5.52876Z"
                      fill="#B4BDC4"
                    />
                  </svg>
                  {isDropdownSorted && (
                    <div
                      className={
                        theme === Theme.light
                          ? styles.selectDrobdownSortBy
                          : styles.selectDrobdownSortByDark
                      }
                    >
                      {[Sort.alphabet, Sort.cheapest, Sort.newest].map(
                        (sort, index) => (
                          <NavLink
                            key={index}
                            to={{
                              pathname: '',
                              search: `?sort=${sort}`,
                            }}
                          >
                            <span
                              className={styles.drobdownItem}
                              onClick={() => {
                                handlerSortedProduct(sort);
                              }}
                            >
                              {sort}
                            </span>
                          </NavLink>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.selectAndItemsPage}>
              <span className={styles.selectDescription}>Items on page</span>
              <div
                className={
                  theme === Theme.light
                    ? styles.customSelectItems
                    : styles.customSelectItemsDark
                }
                onClick={drobdownHandler}
              >
                <span
                  className={
                    theme === Theme.light
                      ? styles.selectItem
                      : styles.selectItemDark
                  }
                >
                  {perPage === products.length ? 'All' : perPage}
                </span>
                <svg
                  className={styles.selectIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M12.4717 5.52876C12.7321 5.78911 12.7321 6.21122 12.4717 6.47157L8.47173 10.4716C8.21138 10.7319 7.78927 10.7319 7.52892 10.4716L3.52892 6.47157C3.26857 6.21122 3.26857 5.78911 3.52892 5.52876C3.78927 5.26841 4.21138 5.26841 4.47173 5.52876L8.00033 9.05735L11.5289 5.52876C11.7893 5.26841 12.2114 5.26841 12.4717 5.52876Z"
                    fill="#B4BDC4"
                  />
                </svg>
                {isDropdown && (
                  <div
                    className={
                      theme === Theme.light
                        ? styles.selectDrobdownItem
                        : styles.selectDrobdownItemDark
                    }
                  >
                    {[4, 8, 16].map(value => (
                      <NavLink
                        key={value}
                        to={{
                          pathname: '',
                          search: `?items=${value}`,
                        }}
                      >
                        <span
                          key={value}
                          className={styles.drobdownItem}
                          onClick={() => setPerPage(value)}
                        >
                          {value}
                        </span>
                      </NavLink>
                    ))}
                    <span
                      className={styles.drobdownItem}
                      onClick={() => setPerPage(products.length)}
                    >
                      All
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.products}>
            {load ? (
              <div className={styles.loaderContainer}>{<Loader />}</div>
            ) : (
              <div className={styles.productGrid}>
                {itemsToPrint().map(item => (
                  <div key={item.id}>
                    {!load && <ProductCard item={item} type={type} />}{' '}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.pangination}>
            {!load && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handleChangePage}
              />
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};
