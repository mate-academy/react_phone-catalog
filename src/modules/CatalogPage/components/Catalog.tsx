import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ProductsList } from '../../shared/ProductsList/ProductsList';
import { Product } from './../../../types/Product';
import { PagesSwitcher } from './../pagesSwitcher/PagesSwitcher';
import { CatalogFilters } from '../catalogFilters/CatalogFilters';
import { setModels, setTitle } from './../../../features/pagesDetailsSlice';
import { Loader } from '../../Loader';
import { setReloadTrigger } from '../../../features/booleanSlice';

export const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  let catalogContent;
  const location = useLocation();

  const [perPage, setPerPage] = useState('all');
  const [sortBy, setSortBy] = useState('age');
  const [page, setPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [pagesWithProducts, setPagesWithProducts] = useState<number[]>([]);
  const [startShowFrom, setStartShowFrom] = useState(0);

  const productsFromServer = useAppSelector(state => state.products.objects);
  const loadingStatus = useAppSelector(state => state.products.loading);
  const loadingError = useAppSelector(state => state.products.error);
  const title = useAppSelector(state => state.pagesDetails.title);
  const models = useAppSelector(state => state.pagesDetails.models);
  const fetchProductsErrorText = useAppSelector(state => state.products.error);

  const queryParams = new URLSearchParams(location.search);
  const sortByParam = queryParams.get('sort');
  const perPageParam = queryParams.get('perPage');
  const pageParams = queryParams.get('page');

  const { productId } = useParams();

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

        setStartShowFrom(+perPage * (+pageParams - 1));
      } else {
        setPage(1);
        setStartShowFrom(0);
      }
    }
  }, [location.search, perPage, sortByParam, pageParams, perPageParam]);

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

  const prepereToShow = (categ: string) => {
    const filteredProduct = productsFromServer.filter(
      prod => prod.category === categ,
    );

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

  useEffect(() => {
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
  }, [location.pathname, productsFromServer, perPage, sortBy, startShowFrom]);

  const handleReloadButton = () => {
    dispatch(setReloadTrigger());
  };

  if (
    displayedProducts.length < 1 &&
    !fetchProductsErrorText &&
    !loadingStatus
  ) {
    catalogContent = (
      <p className={styles.catalog__empty}>
        There are no {location.pathname.slice(1)} yet{' '}
      </p>
    );
  } else if (fetchProductsErrorText) {
    catalogContent = (
      <button
        onClick={handleReloadButton}
        className={`${styles.catalog__reload} ${styles.blackButtonBase}`}
      >
        Reload
      </button>
    );
  } else {
    catalogContent = <ProductsList gadgets={displayedProducts} />;
  }

  return (
    <>
      {!productId ? (
        <div className={styles.gridContainer}>
          <div className={styles.catalog}>
            <div className={styles.catalog__path}>
              <Link to="/">
                <img src="./icons/home-ico.svg" alt="home" />
              </Link>

              <img src="./icons/arrow-right-light-ico.svg" alt="arrow-right" />

              <p className={styles.catalog__pathCategory}>
                {location.pathname.slice(1)}
              </p>
            </div>

            <h1 className={styles.catalog__title}>{title}</h1>

            <p
              className={styles.catalog__quantity}
            >{`${models} ${models === 1 ? 'model' : 'models'}`}</p>

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

            {catalogContent}

            <PagesSwitcher
              sortBy={sortBy}
              perPage={perPage}
              pagesWithProducts={pagesWithProducts}
              showFrom={startShowFrom}
              setShownFrom={setStartShowFrom}
            />
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
