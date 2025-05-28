import { useContext, useEffect, useMemo, useState } from 'react';
import styles from './PhonesPage.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../app/store/GlobalContext';
import { CustomSelect } from '../shared/CustomSelect';
import { ProductCard } from '../shared/ProductCard';
import classNames from 'classnames';

const PRODUCTS_PER_PAGE_OPTIONS = [4, 8, 16, 'All'];
const PAGE_WINDOW_SIZE = 4;

export const PhonesPage = () => {
  const location = useLocation();
  const { products } = useContext(GlobalContext);
  const [selectedSort, setSelectedSort] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState<number | 'All'>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(1);
  const navigate = useNavigate();

  const phones = products.filter(product => product.category === 'phones');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const sortBy = ['Newest', 'Alphabetically', 'Cheapest'];

  const sortedPhones = useMemo(() => {
    switch (selectedSort) {
      case 'Newest':
        return [...phones].sort((a, b) => b.year - a.year);
      case 'Alphabetically':
        return [...phones].sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        );
      case 'Cheapest':
        return [...phones].sort((a, b) => a.price - b.price);
      default:
        return phones;
    }
  }, [phones, selectedSort]);

  const handleSortChange = (sortField: string | number) => {
    if (typeof sortField === 'string') {
      setSelectedSort(sortField);
      setCurrentPage(1);
      setPageWindowStart(1);
    }
  };

  const totalPages = useMemo(() => {
    if (itemsPerPage === 'All') {
      return 1;
    }

    return Math.ceil(phones.length / itemsPerPage);
  }, [phones.length, itemsPerPage]);

  const currentItems = useMemo(() => {
    if (itemsPerPage === 'All') {
      return sortedPhones;
    }

    const start = (currentPage - 1) * itemsPerPage;

    return sortedPhones.slice(start, start + itemsPerPage);
  }, [sortedPhones, currentPage, itemsPerPage]);

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
      <section className={styles.phonesPage}>
        <div className={styles.phonesPage__navigation}>
          <div className={styles.phonesPage__iconHome} onClick={() => navigate('/home')}></div>
          <div className={styles.phonesPage__address}>
            <div className={styles.phonesPage__iconArrowRight}></div>
            <div className={styles.phonesPage__pagePathName}>
              {location.pathname.slice(1)}
            </div>
          </div>
        </div>
        <h1 className={styles.phonesPage__title}>Mobile phones</h1>
        <div
          className={styles.phonesPage__amountModels}
        >{`${phones.length} models`}</div>
        <div className={styles.phonesPage__selectors}>
          <div className={styles.phonesPage__selectorContent}>
            <p className={styles.phonesPage__selectorTitle}>Sort by</p>
            <CustomSelect options={sortBy} onChange={handleSortChange} />
          </div>

          <div className={styles.phonesPage__selectorContent}>
            <p className={styles.phonesPage__selectorTitle}>Items on page</p>
            <CustomSelect
              options={PRODUCTS_PER_PAGE_OPTIONS}
              onChange={handleSelectChange}
            />
          </div>
        </div>
        <ul className={styles.phonesPage__phoneList}>
          {currentItems.map(phone => (
            <li className={styles.phonesPage__phoneItem} key={phone.id}>
              <ProductCard product={phone} />
            </li>
          ))}
        </ul>

        <div className={styles.phonesPage__pagination}>
          <button
            onClick={handlePrevWindow}
            disabled={pageWindowStart === 1}
            className={styles.phonesPage__arrow}
          >
            ❮
          </button>
          <div className={styles.phonesPage__numberButtonsWrapper}>
            <div className={styles.phonesPage__numberButtons}>
              {visiblePageButtons.map(page => (
                <button
                  key={page}
                  className={classNames(styles.phonesPage__numberButton, {
                    [styles.phonesPage__numberButton_active]:
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
            className={styles.phonesPage__arrow}
          >
            ❯
          </button>
        </div>
      </section>
    </div>
  );
};
