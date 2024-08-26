import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ProductsList } from '../../shared/ProductsList/ProductsList';
import { Product } from './../../../types/Product';
import { PagesSwitcher } from './../pagesSwitcher/PagesSwitcher';
import { CatalogFilters } from '../catalogFilters/CatalogFilters';
import {
  setModels,
  setStartShowFrom,
  setTitle,
} from './../../../features/pagesDetailsSlice';
import { Loader } from '../../Loader';
import { setReloadTrigger } from '../../../features/booleanSlice';
import { SearchBar } from '../searchBar/SeatchBar';
import { useTranslation } from 'react-i18next';

export const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  let catalogContent;
  const location = useLocation();
  const { t } = useTranslation();

  const [perPage, setPerPage] = useState('4');
  const [sortBy, setSortBy] = useState('age');
  const [page, setPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [pagesWithProducts, setPagesWithProducts] = useState<number[]>([]);
  const [noProductsMessage, setNoProductsMessage] = useState('');
  const [filterLoader, setFilterLoader] = useState(false);

  const productsFromServer = useAppSelector(state => state.products.objects);
  const loadingStatus = useAppSelector(state => state.products.loading);
  const loadingError = useAppSelector(state => state.products.error);
  const title = useAppSelector(state => state.pagesDetails.title);
  const models = useAppSelector(state => state.pagesDetails.models);
  const fetchProductsErrorText = useAppSelector(state => state.products.error);
  const isDark = useAppSelector(state => state.boolean.isDark);
  const startShowFrom = useAppSelector(
    state => state.pagesDetails.startShowFrom,
  );

  const queryParams = new URLSearchParams(location.search);
  const sortByParam = queryParams.get('sort');
  const perPageParam = queryParams.get('perPage');
  const pageParams = queryParams.get('page');
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    const catalog = document.getElementById('catalogId');

    if (isDark) {
      catalog?.style.setProperty('--secondary-grey-color', '#75767f');
    } else {
      catalog?.style.setProperty('--secondary-grey-color', '#89939a');
    }
  }, [isDark]);

  useEffect(() => {
    if (sortByParam) {
      setSortBy(sortByParam);
    }

    if (perPageParam) {
      setPerPage(perPageParam);
    }

    if (pageParams) {
      if (perPageParam !== 'all') {
        setPage(+pageParams);
        dispatch(setStartShowFrom(+perPage * (+pageParams - 1)));
      } else {
        setPage(1);
        setStartShowFrom(0);
      }
    }
  }, [
    location.search,
    perPage,
    sortByParam,
    pageParams,
    perPageParam,
    dispatch,
  ]);

  useEffect(() => {
    setPage(1);
    setStartShowFrom(0);
  }, [location.pathname, perPageParam]);

  useEffect(() => {
    if (models !== null) {
      if (perPage === 'all') {
        setPagesWithProducts([1]);
      } else {
        const pages = Math.ceil(models / +perPage);

        const array = [];

        for (let i = 1; i <= pages; i++) {
          array.push(i);
        }

        setPagesWithProducts(array);
      }
    }
  }, [models, perPage]);

  useEffect(() => {
    const prepereToShow = (categ: string) => {
      let filteredProduct;

      if (query) {
        filteredProduct = productsFromServer.filter(prod => {
          if (
            prod.category === categ &&
            prod.name.toLowerCase().includes(query.toLowerCase().trim())
          ) {
            return prod;
          } else {
            return false;
          }
        });

        setNoProductsMessage(
          `${t('there_are_no')} ${t(location.pathname.slice(1))} ${t('matching_the_query')}`,
        );
      } else {
        filteredProduct = productsFromServer.filter(
          prod => prod.category === categ,
        );

        setNoProductsMessage(
          `${t('there_are_no')} ${t(location.pathname.slice(1))} ${t('yet')}`,
        );
      }

      dispatch(setModels(filteredProduct.length));

      switch (sortBy) {
        case 'title':
          if (perPage !== 'all') {
            return filteredProduct
              .slice()
              .sort((el1, el2) => {
                return el1.name.localeCompare(el2.name);
              })
              .slice(startShowFrom, startShowFrom + +perPage);
          } else {
            return filteredProduct.slice().sort((el1, el2) => {
              return el1.name.localeCompare(el2.name);
            });
          }

        case 'price':
          if (perPage !== 'all') {
            return filteredProduct
              .slice()
              .sort((el1, el2) => {
                return el1.price - el2.price;
              })
              .slice(startShowFrom, startShowFrom + +perPage);
          } else {
            return filteredProduct.slice().sort((el1, el2) => {
              return el1.price - el2.price;
            });
          }

        default:
          if (perPage !== 'all') {
            return filteredProduct
              .slice()
              .sort((el1, el2) => {
                return el2.year - el1.year;
              })
              .slice(startShowFrom, startShowFrom + +perPage);
          } else {
            return filteredProduct.slice().sort((el1, el2) => {
              return el2.year - el1.year;
            });
          }
      }
    };

    if (location.pathname === '/phones') {
      dispatch(setTitle('Mobile phones'));
      setDisplayedProducts(prepereToShow('phones'));
    } else if (location.pathname === '/tablets') {
      dispatch(setTitle('Tablets'));

      setDisplayedProducts(prepereToShow('tablets'));
    } else if (location.pathname === '/accessories') {
      dispatch(setTitle('Accessories'));
      setDisplayedProducts(prepereToShow('accessories'));
    }
  }, [
    location.pathname,
    productsFromServer,
    perPage,
    sortBy,
    startShowFrom,
    query,
    dispatch,
    t,
  ]);

  const handleReloadButton = () => {
    dispatch(setReloadTrigger());
  };

  if (
    displayedProducts.length < 1 &&
    !fetchProductsErrorText &&
    !loadingStatus
  ) {
    catalogContent = (
      <p className={styles.catalog__empty}>{noProductsMessage}</p>
    );
  } else if (fetchProductsErrorText) {
    catalogContent = (
      <button
        onClick={handleReloadButton}
        className={`${styles.catalog__reload} ${styles.blackButtonBase} ${isDark && styles.darkReload}`}
      >
        {t('reload')}
      </button>
    );
  } else {
    catalogContent = (
      <>
        <ProductsList gadgets={displayedProducts} />
        <PagesSwitcher
          sortBy={sortBy}
          perPage={perPage}
          pagesWithProducts={pagesWithProducts}
        />
      </>
    );
  }

  return (
    <>
      {!productId ? (
        <div className={styles.gridContainer}>
          <div id="catalogId" className={styles.catalog}>
            <div className={styles.catalog__path}>
              <Link className={styles.catalog__pathHomeLink} to="/">
                {isDark ? (
                  <img src="./icons/dark-theme-icons/home-ico.svg" alt="home" />
                ) : (
                  <img src="./icons/home-ico.svg" alt="home" />
                )}
              </Link>

              {isDark ? (
                <img
                  src="./icons/dark-theme-icons/arrow-right-ico.svg"
                  alt="arrow-right"
                />
              ) : (
                <img
                  src="./icons/arrow-right-light-ico.svg"
                  alt="arrow-right"
                />
              )}

              <p className={styles.catalog__pathCategory}>
                {t(`${location.pathname.slice(1)}`)}
              </p>
            </div>

            <h1 className={styles.catalog__title}>
              {t(`${title.toLowerCase()}`)}
            </h1>
            <p className={styles.catalog__quantity}>
              {`${models} ${models === 1 ? `${t('model')}` : `${t('models')}`}`}
            </p>
            <SearchBar setLoader={setFilterLoader} />
            <CatalogFilters
              page={page}
              perPage={perPage}
              sortBy={sortBy}
              setSort={setSortBy}
              setPer={setPerPage}
              setPagePage={setPage}
            />
            {loadingStatus && <Loader />}
            {loadingError !== '' && (
              <p className={'has-text-danger'}>{loadingError}</p>
            )}
            {filterLoader ? <Loader /> : catalogContent}
          </div>
        </div>
      ) : (
        <div className={styles.gridContainer}>
          <Outlet />
        </div>
      )}
    </>
  );
};
