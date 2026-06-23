import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Accessories.module.scss';
import { SortValue } from '../../../../types/SortValue';
import { NumberOfItemsValue } from '../../../../types/NumberOfItemsValue';
import { OpenDropdown } from '../../../../types/OpenDropdown';
import { ProductList } from '../../../shared/ProductList/ProductList';
import { Product } from '../../../../types/Product';
import allProducts from '../../../../../public/api/products.json';
import { getAccessories } from '../../../../api/accessories';
import { Loader } from '../Loader/Loader';
import { useLocation, Outlet, Link, useSearchParams } from 'react-router-dom';

export const Accessories: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);
  const [sortSelectedValue, setSortSelectedValue] =
    useState<SortValue>('Newest');
  const [numberOfItemsSelectedValue, setNumberOfItemsSelectedValue] =
    useState<NumberOfItemsValue>('4');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessories, setAccessories] = useState<Product[]>([]);

  const sortRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement | null>(null);

  const fetchAccessories = () => {
    setIsLoading(true);
    setError(null);
    getAccessories()
      .then(result => {
        setAccessories(result);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node) &&
        itemsRef.current &&
        !itemsRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const sortFromUrl = searchParams.get('sort');
    const pageFromUrl = searchParams.get('page');
    const perPageFromUrl = searchParams.get('perPage');

    if (sortFromUrl) {
      if (sortFromUrl === 'age') {
        setSortSelectedValue('Newest');
      }

      if (sortFromUrl === 'title') {
        setSortSelectedValue('Alphabetically');
      }

      if (sortFromUrl === 'price') {
        setSortSelectedValue('Cheapest');
      }
    }

    if (pageFromUrl) {
      setCurrentPage(+pageFromUrl);
    }

    if (perPageFromUrl) {
      setNumberOfItemsSelectedValue(perPageFromUrl as NumberOfItemsValue);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (sortSelectedValue === 'Newest') {
      params.set('sort', 'age');
    }

    if (sortSelectedValue === 'Alphabetically') {
      params.set('sort', 'title');
    }

    if (sortSelectedValue === 'Cheapest') {
      params.set('sort', 'price');
    }

    if (currentPage !== 1) {
      params.set('page', currentPage.toString());
    }

    if (numberOfItemsSelectedValue !== 'all') {
      params.set('perPage', numberOfItemsSelectedValue);
    }

    setSearchParams(params);
  }, [
    sortSelectedValue,
    currentPage,
    numberOfItemsSelectedValue,
    setSearchParams,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortSelectedValue, numberOfItemsSelectedValue]);

  const location = useLocation();
  const isPhones = location.pathname === '/phones';
  const isTablets = location.pathname === '/tablets';
  const isAccessories = location.pathname === '/accessories';

  const preparedProducts = useMemo(() => {
    let products: Product[] = [];

    if (isPhones) {
      products = [...allProducts].filter(
        product => product.category === 'phones',
      );
    }

    if (isTablets) {
      products = [...allProducts].filter(
        product => product.category === 'tablets',
      );
    }

    if (isAccessories) {
      products = [...allProducts].filter(
        product => product.category === 'accessories',
      );
    }

    if (sortSelectedValue === 'Newest') {
      products.sort((a, b) => b.year - a.year);
    }

    if (sortSelectedValue === 'Alphabetically') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortSelectedValue === 'Cheapest') {
      products.sort((a, b) => a.price - b.price);
    }

    return products;
  }, [sortSelectedValue, isPhones, isAccessories, isTablets]);

  const visibleProducts = useMemo(() => {
    if (numberOfItemsSelectedValue === 'all') {
      return preparedProducts;
    }

    const itemsPerPage = +numberOfItemsSelectedValue;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return preparedProducts.slice(startIndex, endIndex);
  }, [currentPage, numberOfItemsSelectedValue, preparedProducts]);

  const totalPages = useMemo(() => {
    if (numberOfItemsSelectedValue === 'all') {
      return 1;
    }

    return Math.ceil(preparedProducts.length / +numberOfItemsSelectedValue);
  }, [preparedProducts.length, numberOfItemsSelectedValue]);

  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const pagesVisible = 4;

  const visiblePages = useMemo(() => {
    const half = Math.floor(pagesVisible / 2);

    let start = currentPage - half;
    let end = start + pagesVisible - 1;

    if (start < 1) {
      start = 1;
      end = pagesVisible;
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - pagesVisible + 1);
    }

    const result: number[] = [];

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  }, [currentPage, totalPages]);

  return (
    <div className={styles.product_page}>
      <div className={styles.product_page__container}>
        <h1 className="hidden">Accessories page</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={fetchAccessories}>Reload</button>
          </div>
        ) : accessories.length === 0 ? (
          <div className={styles.empty}>There are no accessories yet.</div>
        ) : (
          <>
            <div className={styles.breadcrumbs}>
              <Link to="/" className={styles.breadcrumbs__link}>
                <img
                  src="img/icons/home.png"
                  className={styles.breadcrumbs__icon}
                  alt="Home"
                />
              </Link>

              <div className={styles.breadcrumbs__separator}></div>

              <h4 className={styles.breadcrumbs__current}>Accessories</h4>
            </div>

            <h1 className={styles.product_page__title}>Accessories</h1>
            <h4
              className={styles.product_page__amount}
            >{`${accessories.length} models`}</h4>

            <div className={styles.dropdowns}>
              <div
                ref={sortRef}
                className={`${styles.dropdown} ${styles['dropdown--sort']} ${
                  openDropdown === 'sort' ? styles['dropdown--open'] : ''
                }`}
              >
                <label className={styles.dropdown__name} htmlFor="sort-by">
                  Sort by
                </label>
                <button
                  id="sort-by"
                  className={styles.dropdown__selected}
                  onClick={() =>
                    setOpenDropdown(prev => (prev === 'sort' ? null : 'sort'))
                  }
                >
                  <span className={styles['dropdown__selected-value']}>
                    {sortSelectedValue}
                  </span>
                </button>
                <ul
                  className={`${styles.dropdown__options} ${openDropdown === 'sort' ? styles['dropdown__options--open'] : ''}`}
                >
                  <li
                    className={styles.dropdown__option}
                    onClick={() => {
                      setSortSelectedValue('Newest');
                      setOpenDropdown(null);
                    }}
                  >
                    Newest
                  </li>
                  <li
                    className={styles.dropdown__option}
                    onClick={() => {
                      setSortSelectedValue('Alphabetically');
                      setOpenDropdown(null);
                    }}
                  >
                    Alphabetically
                  </li>
                  <li
                    className={styles.dropdown__option}
                    onClick={() => {
                      setSortSelectedValue('Cheapest');
                      setOpenDropdown(null);
                    }}
                  >
                    Cheapest
                  </li>
                </ul>
              </div>

              <div
                ref={itemsRef}
                className={`${styles.dropdown} ${styles['dropdown--items']} ${openDropdown === 'items' ? styles['dropdown--open'] : ''}`}
              >
                <label
                  className={styles.dropdown__name}
                  htmlFor="items-on-page"
                >
                  Items on page
                </label>
                <button
                  id="items-on-page"
                  className={styles.dropdown__selected}
                  onClick={() =>
                    setOpenDropdown(prev => (prev === 'items' ? null : 'items'))
                  }
                >
                  <span className={styles['dropdown__selected-value']}>
                    {numberOfItemsSelectedValue}
                  </span>
                </button>
                <ul
                  className={`${styles.dropdown__options} ${openDropdown === 'items' ? styles['dropdown__options--open'] : ''}`}
                >
                  <li
                    className={styles.dropdown__option}
                    onClick={() => {
                      setNumberOfItemsSelectedValue('4');
                      setOpenDropdown(null);
                    }}
                  >
                    4
                  </li>
                  <li
                    className={styles.dropdown__option}
                    onClick={() => {
                      setNumberOfItemsSelectedValue('8');
                      setOpenDropdown(null);
                    }}
                  >
                    8
                  </li>
                  <li
                    className={styles.dropdown__option}
                    onClick={() => {
                      setNumberOfItemsSelectedValue('16');
                      setOpenDropdown(null);
                    }}
                  >
                    16
                  </li>
                  <li
                    className={styles.dropdown__option}
                    onClick={() => {
                      setNumberOfItemsSelectedValue('all');
                      setOpenDropdown(null);
                    }}
                  >
                    all
                  </li>
                </ul>
              </div>
            </div>
            <ProductList
              visibleProducts={visibleProducts}
              itemsAreAll={numberOfItemsSelectedValue === 'all'}
            />

            {numberOfItemsSelectedValue !== 'all' && totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={`${styles.pagination__button} ${styles['pagination__button--prev']}`}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                ></button>
                <ul className={styles.pagination__list}>
                  {visiblePages.map(page => (
                    <li
                      key={page}
                      className={`${styles.pagination__item} ${
                        page === currentPage
                          ? styles['pagination__item--active']
                          : ''
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </li>
                  ))}
                </ul>
                <button
                  className={`${styles.pagination__button} ${styles['pagination__button--next']}`}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                ></button>
              </div>
            )}
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
};
