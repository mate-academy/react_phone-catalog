import { useContext, useEffect, useMemo, useState } from 'react';
import styles from './TabletsPage.module.scss';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../../app/store/GlobalContext';
import { CustomSelect } from '../shared/CustomSelect';
import { ProductCard } from '../shared/ProductCard';
import classNames from 'classnames';

const PRODUCTS_PER_PAGE_OPTIONS = [4, 8, 16, 'All'];
const PAGE_WINDOW_SIZE = 4;

export const TabletsPage = () => {
  const location = useLocation();
  const { products } = useContext(GlobalContext);
  const [selectedSort, setSelectedSort] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState<number | 'All'>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(1);

  const tablets = products.filter(product => product.category === 'tablets');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const sortBy = ['Newest', 'Alphabetically', 'Cheapest'];

  const getSortedTablets = () => {
    switch (selectedSort) {
      case 'Newest':
        return [...tablets].sort((a, b) => b.year - a.year);
      case 'Alphabetically':
        return [...tablets].sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        );
      case 'Cheapest':
        return [...tablets].sort((a, b) => a.price - b.price);
      default:
        return tablets;
    }
  };

  const handleSortChange = (sortField: string | number) => {
    if (typeof sortField === 'string') {
      setSelectedSort(sortField);
    }

    return getSortedTablets();
  };

  const totalPages = useMemo(() => {
    if (itemsPerPage === 'All') {
      return 1;
    }

    return Math.ceil(tablets.length / itemsPerPage);
  }, [tablets.length, itemsPerPage]);

  const currentItems = useMemo(() => {
    if (itemsPerPage === 'All') {
      return getSortedTablets();
    }

    const start = (currentPage - 1) * itemsPerPage;

    return getSortedTablets().slice(start, start + itemsPerPage);
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
      <section className={styles.tabletsPage}>
        <div className={styles.tabletsPage__navigation}>
          <div className={styles.tabletsPage__iconHome}></div>
          <div className={styles.tabletsPage__address}>
            <div className={styles.tabletsPage__iconArrowRight}></div>
            <div className={styles.tabletsPage__pagePathName}>
              {location.pathname.slice(1)}
            </div>
          </div>
        </div>
        <h1 className={styles.tabletsPage__title}>Tablets</h1>
        <div
          className={styles.tabletsPage__amountModels}
        >{`${tablets.length} models`}</div>
        <div className={styles.tabletsPage__selectors}>
          <div className={styles.tabletsPage__selectorContent}>
            <p className={styles.tabletsPage__selectorTitle}>Sort by</p>
            <CustomSelect options={sortBy} onChange={handleSortChange} />
          </div>

          <div className={styles.tabletsPage__selectorContent}>
            <p className={styles.tabletsPage__selectorTitle}>Items on page</p>
            <CustomSelect
              options={PRODUCTS_PER_PAGE_OPTIONS}
              onChange={handleSelectChange}
            />
          </div>
        </div>
        <ul className={styles.tabletsPage__phoneList}>
          {currentItems.map(phone => (
            <li className={styles.tabletsPage__phoneItem} key={phone.id}>
              <ProductCard product={phone} />
            </li>
          ))}
        </ul>

        <div className={styles.tabletsPage__pagination}>
          <button
            onClick={handlePrevWindow}
            disabled={pageWindowStart === 1}
            className={styles.tabletsPage__arrow}
          >
            ❮
          </button>
          <div className={styles.tabletsPage__numberButtonsWrapper}>
            <div className={styles.tabletsPage__numberButtons}>
              {visiblePageButtons.map(page => (
                <button
                  key={page}
                  className={classNames(styles.tabletsPage__numberButton, {
                    [styles.tabletsPage__numberButton_active]:
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
            className={styles.tabletsPage__arrow}
          >
            ❯
          </button>
        </div>
      </section>
    </div>
  );
};
