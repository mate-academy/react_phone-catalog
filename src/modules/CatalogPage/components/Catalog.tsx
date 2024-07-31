import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ProductsList } from '../../shared/ProductsList/ProductsList';
import { Product } from './../../../types/Product';
import { PagesSwitcher } from './../pagesSwitcher/PagesSwitcher';
import { CatalogFilters } from '../catalogFilters/CatalogFilters';
import { setModels, setTitle } from './../../../features/pagesDetailsSlice';

export const Catalog: React.FC = () => {
  const [perPage, setPerPage] = useState('all');
  const [sortBy, setSortBy] = useState('Newest');
  const [page, setPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [pagesWithProducts, setPagesWithProducts] = useState<number[]>([]);
  const [startShowFrom, setStartShowFrom] = useState(0);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const productsFromServer = useAppSelector(state => state.products.objects);
  const title = useAppSelector(state => state.pagesDetails.title);
  const models = useAppSelector(state => state.pagesDetails.models);

  const queryParams = new URLSearchParams(location.search);
  const sortByParam = queryParams.get('sortBy');
  const perPageParam = queryParams.get('perPage');
  const pageParams = queryParams.get('page');

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
  }, [location.search, perPage]);

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
      case 'Alphabetically':
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

      case 'Cheapest':
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

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__path}>
        <Link to="/">
          <img src="/icons/home-ico.svg" alt="home" />
        </Link>

        <img src="/icons/arrow-right-light-ico.svg" alt="arrow-right" />

        <p className={styles.catalog__pathCategory}>
          {location.pathname.slice(1)}
        </p>
      </div>

      <h1 className={styles.catalog__title}>{title}</h1>

      <p className={styles.catalog__quantity}>{`${models} models`}</p>

      <CatalogFilters
        page={page}
        perPage={perPage}
        sortBy={sortBy}
        setSort={setSortBy}
        setPer={setPerPage}
      />

      <ProductsList gadgets={displayedProducts} />

      <PagesSwitcher
        sortBy={sortBy}
        perPage={perPage}
        pagesWithProducts={pagesWithProducts}
        showFrom={startShowFrom}
        setShownFrom={setStartShowFrom}
      />
    </div>
  );
};
