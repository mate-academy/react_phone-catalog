import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import { Products } from '../../types/Products';
import { Link, useSearchParams } from 'react-router-dom';
import { PerPage } from '../../types/ItemsPerPage';
import styles from './ProductsPage.module.scss';
import { ModelItem } from '../HomePage/Models/ModelsItem';
import { FilterBy } from '../../types/FilterBy';
import { useAppContext } from '../../AppContext';
import { getProduct } from '../../api';
import { Loader } from '../Loader';
import { HeaderPageListsSection } from '../../types/PageForShow';
import { Paginations } from './Pagination/Pagination';
import { Footer } from '../Footer';

interface Props {
  product: Products[];
}

export const ProductsPage: React.FC<Props> = ({ product }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredProduct, setFilteredProduct] = useState<Products[]>([]);
  const [activeDropDown, setActiveDropDown] = useState(false);
  const [activeDropDownPage, setActiveDropDownPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = searchParams.get('perPage') || PerPage.All;
  const filterBy = searchParams.get('filterBy') || FilterBy.age;
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { currentPage } = useAppContext();

  const startElement =
    itemsPerPage === PerPage.All ? 0 : currentIndex * Number(itemsPerPage);
  const endElement =
    itemsPerPage === PerPage.All
      ? product.length
      : Math.min(startElement + Number(itemsPerPage), product.length);

  const handleSetFilter = (item: FilterBy) => {
    const params = new URLSearchParams(searchParams);

    params.set('filterBy', item);
    setSearchParams(params);
    setActiveDropDown(false);
  };

  const handleSetPerPage = (item: PerPage) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', item);
    setSearchParams(params);
    setActiveDropDownPage(false);
  };

  const sortedProducts = (
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
    setLoading(true);

    const fetchData = async () => {
      const allProducts = await getProduct();
      const filteredData = allProducts.filter(
        item => item.category === currentPage.toLowerCase(),
      );

      const sortedData = sortedProducts(filteredData, filterBy);

      setFilteredProduct(sortedData);
      setLoading(false);
    };

    fetchData();
  }, [filterBy, currentPage]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={styles.page}>
      <div className={styles.page__container}>
        <div className={styles.page__main}>
          <div className={styles.page__breadcrumbs}>
            <Link className={styles['page__breadcrumbs-link']} to="/">
              <img src="img/icons/Home.svg" alt="home" />
            </Link>
            <img
              src="img/icons/Chevron-right.svg"
              className={styles['page__breadcrumbs-link']}
              alt="arrow"
            />
            <p className={styles.page__current}>{currentPage}</p>
          </div>
          {currentPage === HeaderPageListsSection.Phones ? (
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
                className={cn('dropdown', styles.page__dropdown, {
                  'is-active': activeDropDown,
                })}
                onClick={() => setActiveDropDown(!activeDropDown)}
                ref={dropDownRef}
              >
                <div className="dropdown-trigger">
                  <button
                    className={`button ${styles.page__button}`}
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span className={styles.page__item}>{filterBy}</span>
                    {activeDropDown ? (
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
                        className={cn('dropdown-item', styles.page__item, {
                          'is-active': item === filterBy,
                        })}
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
                className={cn('dropdown', { 'is-active': activeDropDownPage })}
                onClick={() => setActiveDropDownPage(!activeDropDownPage)}
                ref={dropDownRef}
              >
                <div className="dropdown__trigger">
                  <button
                    className={`button ${styles.page__button}`}
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span className={styles.page__item}>{itemsPerPage}</span>
                    {activeDropDownPage ? (
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
                        className={cn('dropdown-item', styles.page__item, {
                          'is-active': item === itemsPerPage,
                        })}
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
            {filteredProduct.slice(startElement, endElement).map(phone => (
              <ModelItem
                model={phone}
                modelsTitle="Hot prices"
                key={phone.id}
              />
            ))}
          </div>
        </div>
        {itemsPerPage !== PerPage.All && (
          <Paginations
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
