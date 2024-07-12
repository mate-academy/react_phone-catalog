import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductsPage.module.scss';
import { ModelItem } from '../HomePage/Models/ModelItem';
import { Products } from '../../types/Products';
import { FilterBy } from '../../types/FilterBy';
import { PageSection } from '../../types/PageSection';
import { PerPage } from '../../types/ItemsPerPage';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import { Pagination } from './Pagination';
import { Footer } from '../Footer';
import { useAppContext } from '../../AppContext';
import { Link, useSearchParams } from 'react-router-dom';
import { getProduct } from '../../api';
import { Loader } from '../Loader';

interface Props {
  product: Products[];
}

export const ProductsPage: React.FC<Props> = ({ product }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterBy = searchParams.get('filterBy') || FilterBy.age;
  const itemsPerPage = searchParams.get('perPage') || PerPage.All;
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [activeDropdownPage, setActiveDropdownPage] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownPageRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentPage } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [filteredProduct, setFilteredProduct] = useState<Products[]>([]);

  const startEl =
    itemsPerPage === PerPage.All ? 0 : currentIndex * Number(itemsPerPage);
  const endEl =
    itemsPerPage === PerPage.All
      ? product.length
      : Math.min(startEl + Number(itemsPerPage), product.length);

  const handleSetFilter = (item: FilterBy) => {
    const params = new URLSearchParams(searchParams);

    params.set('filterBy', item);
    setSearchParams(params);
    setActiveDropdown(false);
  };

  const handleSetPerPage = (item: PerPage) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', item);
    setSearchParams(params);
    setActiveDropdownPage(false);
  };

  const sortedProduct = (
    products: Products[],
    newFilter: string,
  ): Products[] => {
    switch (newFilter) {
      case FilterBy.age:
        return [...products].sort((a, b) => b.year - a.year);
      case FilterBy.title:
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case FilterBy.price:
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  useEffect(() => {
    setLoading(true); // Встановлюємо loading в true перед початком завантаження

    const fetchAndFilterData = async () => {
      const allProducts = await getProduct();
      const filteredData = allProducts.filter(
        prod => prod.category === currentPage.toLowerCase(),
      );

      const sortedData = sortedProduct(filteredData, filterBy);

      setFilteredProduct(sortedData);
      setLoading(false); // Після завершення завантаження встановлюємо loading в false
    };

    fetchAndFilterData();
  }, [filterBy, currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(false);
      }

      if (
        dropdownPageRef.current &&
        !dropdownPageRef.current.contains(event.target as Node)
      ) {
        setActiveDropdownPage(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <Loader />; // Показуємо лоадер під час завантаження даних
  }

  return (
    <main id="main" className={styles.page}>
      <div className={styles.page__container}>
        <div className={styles.page__main}>
          <div className={styles.page__breadcrumbs}>
            <Link className={styles['page__breadcrumbs-link']} to="/">
              <img src="img/products/home.svg" alt="home" />
            </Link>
            <img
              className={styles['page__breadcrumbs-link']}
              src="img/products/arrow.svg"
              alt="arrow"
            />
            <Link className={styles['page__breadcrumbs-link']} to="./">
              <p className={styles.page__current}>{currentPage}</p>
            </Link>
          </div>
          {currentPage === PageSection.Phones ? (
            <h2 className={styles.page__title}>Mobile phones</h2>
          ) : (
            <h2 className={styles.page__title}>{currentPage}</h2>
          )}
          <p
            className={styles.page__subtitle}
          >{`${filteredProduct.length} models`}</p>
        </div>
        <div className={styles.page__content}>
          <div className={styles.page__filter}>
            <div
              className={`${styles['page__filter-by--per-page']} ${styles['page__filter-by']}`}
            >
              <h3 className={styles['page__filter-name']}>Sort by</h3>
              <div
                className={classNames('dropdown', styles.page__dropdown, {
                  'is-active': activeDropdown,
                })}
                onClick={() => setActiveDropdown(!activeDropdown)}
                ref={dropdownRef}
              >
                <div className="dropdown-trigger">
                  <button
                    className={`button ${styles.page__button}`}
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span className={styles.page__item}>{filterBy}</span>
                    {activeDropdown ? (
                      <span
                        className={`${styles.page__arrow} ${styles['page__arrow--up']}`}
                      ></span>
                    ) : (
                      <span
                        className={`${styles.page__arrow} ${styles['page__arrow--down']}`}
                      ></span>
                    )}
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    {Object.values(FilterBy).map(item => (
                      <button
                        className={classNames(
                          'dropdown-item',
                          styles.page__item,
                          {
                            'is-active': item === filterBy,
                          },
                        )}
                        key={item}
                        onClick={() => handleSetFilter(item)}
                      >
                        {' '}
                        {item}{' '}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles['page__filter-by--per-page']} ${styles['page__filter-by']}`}
            >
              <h3 className={styles['page__filter-name']}>Items per page</h3>
              <div
                className={classNames('dropdown', {
                  'is-active': activeDropdownPage,
                })}
                onClick={() => setActiveDropdownPage(!activeDropdownPage)}
                ref={dropdownPageRef}
              >
                <div className="dropdown-trigger">
                  <button
                    className={`button ${styles.page__button}`}
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span className={styles.page__item}>{itemsPerPage}</span>
                    {activeDropdownPage ? (
                      <span
                        className={`${styles.page__arrow} ${styles['page__arrow--up']}`}
                      ></span>
                    ) : (
                      <span
                        className={`${styles.page__arrow} ${styles['page__arrow--down']}`}
                      ></span>
                    )}
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    {Object.values(PerPage).map(item => (
                      <button
                        className={classNames(
                          'dropdown-item',
                          styles.page__item,
                          {
                            'is-active': item === itemsPerPage,
                          },
                        )}
                        key={item}
                        onClick={() => handleSetPerPage(item)}
                      >
                        {' '}
                        {item}{' '}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.page__items}>
            {filteredProduct.slice(startEl, endEl).map(phone => (
              <ModelItem
                model={phone}
                modelsTitle="Hot prices"
                key={phone.id}
              />
            ))}
          </div>
        </div>
        {itemsPerPage !== PerPage.All && (
          <Pagination
            products={filteredProduct}
            perPage={itemsPerPage}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </div>
      <Footer />
    </main>
  );
};
