import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../Types/Product';
import productsData from '../../../public/api/products.json';
import styles from './TabletsPage.module.scss';
import { Loader } from '../../components/Loader/Loader';
import homeIcon from '../../assets/img/Home.png';

export const TabletsPage: React.FC = () => {
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

  const sortedTablets = useMemo(() => {
    let data = Array.isArray(productsData)
      ? [...(productsData as Product[])]
      : [];

    data = data.filter(product => product.category === 'tablets');

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

    return Math.ceil(sortedTablets.length / parseInt(perPage));
  }, [sortedTablets, perPage]);

  const visibleTalbets = useMemo(() => {
    if (perPage === 'All') {
      return sortedTablets;
    }

    const limit = parseInt(perPage);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;

    return sortedTablets.slice(startIndex, endIndex);
  }, [sortedTablets, perPage, currentPage]);

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
    <div className={`${styles.tabletsPage} ${styles.container}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <nav className={styles.breadcrumbs} aria-label="breadcrumb">
            <Link to="/" className={styles.breadcrumbsLink}>
              <img
                src={homeIcon}
                alt="home"
                className={styles.breadcrumbsHomeIcon}
              />
            </Link>
            <div className={styles.breadcrumbsSeparator}></div>
            <span className={styles.breadcrumbsCurrent}>Tablets</span>
          </nav>

          <h1 className={styles.tabletsPageTitle}>Tablets</h1>
          <p className={styles.tabletsPageCount}>
            {sortedTablets.length} models
          </p>

          <div className={styles.tabletsPageFilters}>
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
          <div className={styles.tabletsPageGrid}>
            {visibleTalbets.length > 0 ? (
              visibleTalbets.map(tablet => (
                <ProductCard
                  key={tablet.id}
                  itemId={tablet.itemId}
                  category={tablet.category}
                  image={tablet.image}
                  title={tablet.name}
                  price={tablet.price}
                  fullPrice={tablet.fullPrice}
                  screen={tablet.screen}
                  capacity={tablet.capacity}
                  ram={tablet.ram}
                />
              ))
            ) : (
              <p className={styles.tabletsPageEmpty}>No tablets found.</p>
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
