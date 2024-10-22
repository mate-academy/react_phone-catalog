import styles from './Catalog.module.scss';

import { NavLink, useParams } from 'react-router-dom';
import { Title } from '../../components/Title';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../utils/fetch';
import { Products, SortType } from '../../utils/types';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { SortProducts } from '../../components/SortProducts';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { NotFoundPage } from '../NotFoundPage';
import homeIcon from '../../img/icons/home.png';
import homeIconDark from '../../img/icons/night_theme_home.png';
import { useTheme } from '../../context/ThemeContext';
import { ArrowGrey } from '../../components/ArrowGrey';

export const Catalog = () => {
  // #region state
  const [products, setProducts] = useState<Products[] | []>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Products[] | []>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkTheme } = useTheme();
  // #endregion
  // #region functions
  const getTitleName = (currentCategory: string) => {
    switch (currentCategory) {
      case 'phones':
        return 'Phones page';
      case 'tablets':
        return 'Tablets page';
      case 'accessories':
        return 'Accessories page';
      default:
        return '';
    }
  };

  const reloadPage = () => {
    setUpdatedAt(new Date());
    setErrorMessage('');
  };

  const displayPageItems = (
    allItems: Products[],
    currentPage: number,
    itemsOnPage: number,
  ) => {
    const indexOfFirst = (currentPage - 1) * itemsOnPage;
    const indexOfLast = indexOfFirst + itemsOnPage;

    return allItems.slice(indexOfFirst, indexOfLast);
  };

  //  #endregion
  // #region variables
  const { category } = useParams();
  const knownCategories = ['phones', 'tablets', 'accessories'];
  const pageTitle = category ? getTitleName(category) : '';
  const selectedSortType = searchParams.get('sort') as SortType;
  const itemsOnPage = searchParams.get('perPage') || 'all';
  const activePage = searchParams.get('page') || '1';
  const pagesAmount =
    itemsOnPage === 'all' ? 1 : Math.ceil(products.length / +itemsOnPage);
  // #endregion

  useEffect(() => {
    if (!category || !knownCategories.includes(category)) {
      return; // Перевірка на неіснуючу категорію
    }

    if (category) {
      setIsLoading(true);
      setProducts([]);
      setDisplayedProducts([]);
      fetchProducts(category, selectedSortType)
        .then(res => {
          setProducts(res);
        })
        .catch(() => {
          setErrorMessage('Something went wrong');
        })
        .finally(() => setIsLoading(false));
    }
  }, [category, updatedAt, selectedSortType]);

  useEffect(() => {
    if (!searchParams.get('sort')) {
      searchParams.set('sort', SortType.newest);
      setSearchParams(searchParams);
    }
  }, [category, searchParams, setSearchParams]);

  useEffect(() => {
    if (itemsOnPage === 'all') {
      setDisplayedProducts(products);
    } else {
      setDisplayedProducts(
        displayPageItems(products, +activePage, +itemsOnPage),
      );
    }
  }, [products, searchParams, category, activePage, itemsOnPage]);

  if (!category || !knownCategories.includes(category)) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__navigation}>
        <NavLink to={'/'} style={{ display: 'block' }}>
          <img
            style={{ display: 'block' }}
            src={isDarkTheme ? homeIconDark : homeIcon}
            alt="home icon"
          />
        </NavLink>
        <ArrowGrey />
        <p className={styles['catalog__current-page']}>{category}</p>
      </div>

      {isLoading && <Loader />}

      {errorMessage && (
        <div className={styles.catalog__error}>
          <h2>{errorMessage}</h2>
          <button className={styles.catalog__reload} onClick={reloadPage}>
            Reload
          </button>
        </div>
      )}

      {!isLoading && !errorMessage && products.length === 0 && (
        <h2
          style={{ textAlign: 'center' }}
        >{`There are no ${category} yet`}</h2>
      )}

      {!isLoading && !errorMessage && displayedProducts.length > 0 && (
        <>
          <div className={styles.catalog__title}>
            <Title level={1}>{pageTitle}</Title>
          </div>
          <p className={styles.catalog__quantity}>
            {`${products.length} models`}
          </p>
          <SortProducts
            selectedSortType={selectedSortType}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            itemsOnPage={itemsOnPage}
          />
          <div className={styles.catalog__list}>
            <ProductsList products={displayedProducts} />
          </div>
        </>
      )}

      {pagesAmount > 1 && (
        <Pagination
          pagesAmount={pagesAmount}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          activePage={activePage}
        />
      )}
    </div>
  );
};
