import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../Types/Product';
import productsData from '../../../public/api/products.json';
import styles from './PhonesPage.module.scss';
import { Loader } from '../../components/Loader/Loader';

export const PhonesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortOrder') || 'Newest',
  );
  const [perPage, setPerPage] = useState(searchParams.get('perPage') || 'All');
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPageOpen, setIsPageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sortRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const sortOptions = ['Newest', 'Cheapest', 'Alphabetically'];
  const perPageOptions = ['8', '16', 'All'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }

      if (pageRef.current && !pageRef.current.contains(event.target as Node)) {
        setIsPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage !== 1) {
      params.set('page', String(currentPage));
    }

    if (perPage !== 'All') {
      params.set('perPage', perPage);
    }

    if (sortOrder !== 'Newest') {
      params.set('order', sortOrder);
    }

    setSearchParams(params);
  }, [currentPage, perPage, setSearchParams, sortOrder]);

  const handleSortChange = (option: string) => {
    setSortOrder(option);
    setCurrentPage(1);
    setIsSortOpen(false);
  };

  const handlePerPageChange = (option: string) => {
    setPerPage(option);
    setCurrentPage(1);
    setIsPageOpen(false);
  };

  const sortedPhones = useMemo(() => {
    let data = Array.isArray(productsData)
      ? [...(productsData as Product[])]
      : [];

    data = data.filter(product => product.category === 'phones');

    switch (sortOrder) {
      case 'Cheapest':
        data.sort((a, b) => a.price - b.price);
        break;
      case 'Alphabetically':
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Newest':
      default:
        data.sort((a, b) => b.year - a.year);
        break;
    }

    return data;
  }, [sortOrder]);

  const totalPages = useMemo(() => {
    if (perPage === 'All') {
      return 1;
    }

    return Math.ceil(sortedPhones.length / parseInt(perPage));
  }, [sortedPhones, perPage]);

  const visiblePhones = useMemo(() => {
    if (perPage === 'All') {
      return sortedPhones;
    }

    const limit = parseInt(perPage);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;

    return sortedPhones.slice(startIndex, endIndex);
  }, [sortedPhones, perPage, currentPage]);

  const visiblePageNumbers = useMemo(() => {
    const maxVisible = 4;
    const pages: number[] = [];

    const startPage =
      Math.floor((currentPage - 1) / maxVisible) * maxVisible + 1;
    const endPage = Math.min(startPage + maxVisible - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePrevClick = () => {
    setCurrentPage(prev => (prev === 1 ? totalPages : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentPage(prev => (prev === totalPages ? 1 : prev + 1));
  };

  return (
    <div className={`${styles.phonesPage} ${styles.container}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <nav className={styles.breadcrumbs} aria-label="breadcrumb">
            <Link to="/" className={styles.breadcrumbsLink}>
              <img
                src="img/Home.png"
                alt="home"
                className={styles.breadcrumbsHomeIcon}
              />
            </Link>
            <div className={styles.breadcrumbsSeparator}></div>
            <span className={styles.breadcrumbsCurrent}>Phones</span>
          </nav>

          <h1 className={styles.phonesPageTitle}>Mobile phones</h1>
          <p className={styles.phonesPageCount}>{sortedPhones.length} models</p>

          <div className={styles.phonesPageFilters}>
            <div className={styles.filter} ref={sortRef}>
              <span className={styles.filterLabel}>Sort by</span>
              <div className={styles.dropdown}>
                <button
                  type="button"
                  className={`${styles.dropdownButton} ${isSortOpen ? styles.dropdownButtonActive : ''}`}
                  onClick={() => setIsSortOpen(!isSortOpen)}
                >
                  {sortOrder}
                  <div
                    className={`${styles.dropdownArrow} ${isSortOpen ? styles.dropdownArrowUp : ''}`}
                  ></div>
                </button>

                {isSortOpen && (
                  <ul className={styles.dropdownList}>
                    {sortOptions.map(option => (
                      <li
                        key={option}
                        className={styles.dropdownItem}
                        onClick={() => handleSortChange(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.filter} ref={pageRef}>
              <span className={styles.filterLabel}>Items on page</span>
              <div className={`${styles.dropdown} ${styles.dropdownSmall}`}>
                <button
                  type="button"
                  className={`${styles.dropdownButton} ${isPageOpen ? styles.dropdownButtonActive : ''}`}
                  onClick={() => setIsPageOpen(!isPageOpen)}
                >
                  {perPage}
                  <div
                    className={`${styles.dropdownArrow} ${isPageOpen ? styles.dropdownArrowUp : ''}`}
                  ></div>
                </button>

                {isPageOpen && (
                  <ul className={styles.dropdownList}>
                    {perPageOptions.map(option => (
                      <li
                        key={option}
                        className={styles.dropdownItem}
                        onClick={() => handlePerPageChange(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className={styles.phonesPageGrid}>
            {visiblePhones.length > 0 ? (
              visiblePhones.map(phone => (
                <ProductCard
                  key={phone.id}
                  itemId={phone.itemId}
                  category={phone.category}
                  image={phone.image}
                  title={phone.name}
                  price={phone.price}
                  fullPrice={phone.fullPrice}
                  screen={phone.screen}
                  capacity={phone.capacity}
                  ram={phone.ram}
                />
              ))
            ) : (
              <p className={styles.phonesPageEmpty}>No phones found.</p>
            )}
          </div>

          {perPage !== 'All' && totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.paginationArrow}
                onClick={handlePrevClick}
              >
                <div
                  className={`${styles.paginationArrowIcon} ${styles.paginationArrowIconLeft}`}
                ></div>
              </button>

              <ul className={styles.paginationList}>
                {visiblePageNumbers.map(page => (
                  <li key={page} className={styles.paginationItem}>
                    <button
                      type="button"
                      className={`${styles.paginationButton} ${currentPage === page ? styles.paginationButtonActive : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={styles.paginationArrow}
                onClick={handleNextClick}
              >
                <div
                  className={`${styles.paginationArrowIcon} ${styles.paginationArrowIconRight}`}
                ></div>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
