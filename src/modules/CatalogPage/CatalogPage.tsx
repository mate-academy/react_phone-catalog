/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Product } from '../HomePage/HomePage';
import styles from './CatalogPage.module.scss';
import home from '../../api/icons/Home.svg';
import vector from '../../api/icons/Vector.svg';
import productsData from '../../data/products.json';
import { ProductCard } from '../../components/ProduuctCard/ProductCard';
import { Pagination } from '../../components/Pagination/Pagination';

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  // Состояния для открытия кастомных дропдаунов
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);

  // Рефы для отслеживания клика вне выпадашек
  const sortRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);

  const sortBy = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const displayTitle =
    category === 'phones'
      ? 'Mobile phones'
      : category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : '';

  // Тексты для отображения на кнопках
  const sortLabels: Record<string, string> = {
    newest: 'Newest',
    alphabetically: 'Alphabetically',
    cheapest: 'Cheapest',
  };

  const perPageLabels: Record<string, string> = {
    '4': '4',
    '8': '8',
    '16': '16',
    all: 'All',
  };

  useEffect(() => {
    const filtered = (productsData as Product[]).filter(
      p => p.category === category,
    );

    setProducts(filtered);
  }, [category]);

  // Закрытие дропдаунов при клике снаружи
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }

      if (
        perPageRef.current &&
        !perPageRef.current.contains(event.target as Node)
      ) {
        setIsPerPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'cheapest') {
      return a.price - b.price;
    }

    return b.year - a.year;
  });

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  const handleSortSelect = (value: string) => {
    setSearchParams({ sort: value, perPage, page: '1' });
    setIsSortOpen(false);
  };

  const handlePerPageSelect = (value: string) => {
    setSearchParams({ sort: sortBy, perPage: value, page: '1' });
    setIsPerPageOpen(false);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ sort: sortBy, perPage, page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className={styles.catalogPage}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs}>
          <Link to="/" className={styles.crumbLink}>
            <img src={home} alt="home" />
          </Link>
          <div className={styles.arrowIcon}>
            <img src={vector} alt="arrow" />
          </div>
          <span className={styles.currentCrumb}>
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : ''}
          </span>
        </nav>

        <h1 className={styles.title}>{displayTitle}</h1>
        <p className={styles.count}>{products.length} models</p>

        <div className={styles.controls}>
          {/* Кастомный дропдаун Сортировки */}
          <div className={styles.controlGroup} ref={sortRef}>
            <label className={styles.label}>Sort by</label>
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={`${styles.selectButton} ${isSortOpen ? styles.activeButton : ''}`}
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                  setIsPerPageOpen(false);
                }}
              >
                <span>{sortLabels[sortBy]}</span>
                <span
                  className={`${styles.arrow} ${isSortOpen ? styles.arrowOpen : ''}`}
                >
                  ▼
                </span>
              </button>

              {isSortOpen && (
                <ul className={styles.dropdownMenu}>
                  <li
                    className={sortBy === 'newest' ? styles.selectedOption : ''}
                    onClick={() => handleSortSelect('newest')}
                  >
                    Newest
                  </li>
                  <li
                    className={
                      sortBy === 'alphabetically' ? styles.selectedOption : ''
                    }
                    onClick={() => handleSortSelect('alphabetically')}
                  >
                    Alphabetically
                  </li>
                  <li
                    className={
                      sortBy === 'cheapest' ? styles.selectedOption : ''
                    }
                    onClick={() => handleSortSelect('cheapest')}
                  >
                    Cheapest
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Кастомный дропдаун Количество на странице */}
          <div className={styles.controlGroup} ref={perPageRef}>
            <label className={styles.label}>Items per page</label>
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={`${styles.selectButton} ${isPerPageOpen ? styles.activeButton : ''}`}
                onClick={() => {
                  setIsPerPageOpen(!isPerPageOpen);
                  setIsSortOpen(false);
                }}
              >
                <span>{perPageLabels[perPage]}</span>
                <span
                  className={`${styles.arrow} ${isPerPageOpen ? styles.arrowOpen : ''}`}
                >
                  ▼
                </span>
              </button>

              {isPerPageOpen && (
                <ul className={styles.dropdownMenu}>
                  <li
                    className={perPage === '4' ? styles.selectedOption : ''}
                    onClick={() => handlePerPageSelect('4')}
                  >
                    4
                  </li>
                  <li
                    className={perPage === '8' ? styles.selectedOption : ''}
                    onClick={() => handlePerPageSelect('8')}
                  >
                    8
                  </li>
                  <li
                    className={perPage === '16' ? styles.selectedOption : ''}
                    onClick={() => handlePerPageSelect('16')}
                  >
                    16
                  </li>
                  <li
                    className={perPage === 'all' ? styles.selectedOption : ''}
                    onClick={() => handlePerPageSelect('all')}
                  >
                    All
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Pagination
          totalItems={sortedProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};
