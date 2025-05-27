import { useContext, useEffect, useMemo, useState } from 'react';
import styles from './AccessoriesPage.module.scss';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../../app/store/GlobalContext';
import { CustomSelect } from '../shared/CustomSelect';
import { ProductCard } from '../shared/ProductCard';
import classNames from 'classnames';

const PRODUCTS_PER_PAGE_OPTIONS = [4, 8, 16, 'All'];
const PAGE_WINDOW_SIZE = 4;

export const AccessoriesPage = () => {
  const location = useLocation();
  const { products } = useContext(GlobalContext);
  const [selectedSort, setSelectedSort] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState<number | 'All'>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(1);

  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const sortBy = ['Newest', 'Alphabetically', 'Cheapest'];

  const getSortedAccessories = () => {
    switch (selectedSort) {
      case 'Newest':
        return [...accessories].sort((a, b) => b.year - a.year);
      case 'Alphabetically':
        return [...accessories].sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        );
      case 'Cheapest':
        return [...accessories].sort((a, b) => a.price - b.price);
      default:
        return accessories;
    }
  };

  const handleSortChange = (sortField: string | number) => {
    if (typeof sortField === 'string') {
      setSelectedSort(sortField);
    }

    return getSortedAccessories();
  };

  const totalPages = useMemo(() => {
    if (itemsPerPage === 'All') {
      return 1;
    }

    return Math.ceil(accessories.length / itemsPerPage);
  }, [accessories.length, itemsPerPage]);

  const currentItems = useMemo(() => {
    if (itemsPerPage === 'All') {
      return getSortedAccessories();
    }

    const start = (currentPage - 1) * itemsPerPage;

    return getSortedAccessories().slice(start, start + itemsPerPage);
  }, [selectedSort, currentPage, itemsPerPage]);

  const handleSelectChange = (value: string | number) => {
    const parsedValue: number | 'All' = value === 'All' ? 'All' : Number(value);

    setItemsPerPage(parsedValue);
    setCurrentPage(1);
    setPageWindowStart(1);
  };

  const handlePrevWindow = () => {
    if (pageWindowStart > 1) {
      const newStart = Math.max(1, pageWindowStart - PAGE_WINDOW_SIZE);

      setPageWindowStart(newStart);
      setCurrentPage(newStart);
    }
  };

  const handleNextWindow = () => {
    const maxStart = Math.max(1, totalPages - PAGE_WINDOW_SIZE + 1);

    if (pageWindowStart + PAGE_WINDOW_SIZE - 1 < totalPages) {
      const newStart = Math.min(maxStart, pageWindowStart + PAGE_WINDOW_SIZE);

      setPageWindowStart(newStart);
      setCurrentPage(newStart);
    }
  };

  const visiblePageButtons = useMemo(() => {
    const pagesToShow = Math.min(
      PAGE_WINDOW_SIZE,
      totalPages - pageWindowStart + 1,
    );

    return Array.from({ length: pagesToShow }, (_, i) => pageWindowStart + i);
  }, [pageWindowStart, totalPages]);

  return (
    <div className="container">
      <section className={styles.accessoriesPage}>
        <div className={styles.accessoriesPage__navigation}>
          <div className={styles.accessoriesPage__iconHome}></div>
          <div className={styles.accessoriesPage__address}>
            <div className={styles.accessoriesPage__iconArrowRight}></div>
            <div className={styles.accessoriesPage__pagePathName}>
              {location.pathname.slice(1)}
            </div>
          </div>
        </div>
        <h1 className={styles.accessoriesPage__title}>Accessories</h1>
        <div
          className={styles.accessoriesPage__amountModels}
        >{`${accessories.length} models`}</div>
        <div className={styles.accessoriesPage__selectors}>
          <div className={styles.accessoriesPage__selectorContent}>
            <p className={styles.accessoriesPage__selectorTitle}>Sort by</p>
            <CustomSelect options={sortBy} onChange={handleSortChange} />
          </div>

          <div className={styles.accessoriesPage__selectorContent}>
            <p className={styles.accessoriesPage__selectorTitle}>
              Items on page
            </p>
            <CustomSelect
              options={PRODUCTS_PER_PAGE_OPTIONS}
              onChange={handleSelectChange}
            />
          </div>
        </div>
        <ul className={styles.accessoriesPage__phoneList}>
          {currentItems.map(phone => (
            <li className={styles.accessoriesPage__phoneItem} key={phone.id}>
              <ProductCard product={phone} />
            </li>
          ))}
        </ul>

        <div className={styles.accessoriesPage__pagination}>
          <button
            onClick={handlePrevWindow}
            disabled={pageWindowStart === 1}
            className={styles.accessoriesPage__arrow}
          >
            ❮
          </button>
          <div className={styles.accessoriesPage__numberButtonsWrapper}>
            <div className={styles.accessoriesPage__numberButtons}>
              {visiblePageButtons.map(page => (
                <button
                  key={page}
                  className={classNames(styles.accessoriesPage__numberButton, {
                    [styles.accessoriesPage__numberButton_active]:
                      currentPage === page,
                  })}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleNextWindow}
            disabled={pageWindowStart + PAGE_WINDOW_SIZE - 1 >= totalPages}
            className={styles.accessoriesPage__arrow}
          >
            ❯
          </button>
        </div>
      </section>
    </div>
  );
};
