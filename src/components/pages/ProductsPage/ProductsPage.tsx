import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '../../shared/Loader';
import { ProductsList } from '../../shared/ProductsList';
import { Pagination } from '../../shared/Pagination';
import { Product } from '../../../types/Product';
import { TopNav } from '../../shared/TopNav';
import { Categories } from '../../../types/Categories';
import { getProductsByCategory } from '../../../server/products';
import styles from './ProductsPage.module.scss';
import { useSearchParams } from 'react-router-dom';

type SortBy = 'Newest' | 'Low to High' | 'High to Low';
type ItemsOnPage = 16 | 20 | 24;

type Props = {
  category: Categories;
};

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  // URL PARAMS
  const sortByFromURL = (searchParams.get('sortBy') as SortBy) || 'Newest';
  const pageFromURL = Number(searchParams.get('page') || 1);
  const perPageFromURL = Number(
    searchParams.get('itemsPerPage') || 16,
  ) as ItemsOnPage;

  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const perPageRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);

  const perPageOptions: ItemsOnPage[] = [16, 20, 24];
  const sortOptions: SortBy[] = ['Newest', 'Low to High', 'High to Low'];

  // CLOSE DROPDOWNS
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (perPageRef.current?.contains(event.target as Node)) {
        return;
      }

      if (sortRef.current?.contains(event.target as Node)) {
        return;
      }

      setIsPerPageOpen(false);
      setIsSortOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // LOAD PRODUCTS
  useEffect(() => {
    setLoading(true);
    setError('');

    getProductsByCategory(category)
      .then(data => {
        const filtered = data.filter(
          item => item.priceDiscount < item.priceRegular,
        );

        setItems(filtered);
      })
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, [category]);

  // UPDATE URL
  const setPage = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('page', String(page));

      return params;
    });
  };

  // SORTING
  const sortedItems = [...items].sort((a, b) => {
    switch (sortByFromURL) {
      case 'Newest':
        return Number(b.id) - Number(a.id);
      case 'Low to High':
        return a.priceDiscount - b.priceDiscount;
      case 'High to Low':
        return b.priceDiscount - a.priceDiscount;
      default:
        return 0;
    }
  });

  // PAGINATION
  const lastIndex = perPageFromURL * pageFromURL;
  const firstIndex = lastIndex - perPageFromURL;
  const currentItems = sortedItems.slice(firstIndex, lastIndex);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.products}>
      <TopNav category={category} />

      <h1 className={styles.products__title}>
        {category === 'phones'
          ? 'Mobile phones'
          : category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      <p className={styles.products__length}>
        {items.length} model{items.length !== 1 ? 's' : ''}
      </p>

      {/* SORTING */}
      <div className={styles.products__dropDownMenu}>
        {/* SORT */}
        <div className={styles.dropdown} ref={sortRef}>
          <p className={styles.dropdown__title}>Sort by</p>
          <button
            type="button"
            className={`${styles.dropdown__button} ${isSortOpen ? styles['dropdown__button--active'] : ''}`}
            onClick={() => setIsSortOpen(prev => !prev)}
          >
            {sortByFromURL}
          </button>

          {isSortOpen && (
            <ul className={`${styles.dropdown__content} ${styles.content}`}>
              {sortOptions.map(option => (
                <li
                  key={option}
                  className={styles.content__item}
                  onClick={() => {
                    setSearchParams(prev => {
                      const params = new URLSearchParams(prev);

                      params.set('sortBy', option);
                      params.set('page', '1');

                      return params;
                    });

                    setIsSortOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ITEMS PER PAGE */}
        <div className={styles.dropdown} ref={perPageRef}>
          <p className={styles.dropdown__title}>Items on page</p>
          <button
            type="button"
            className={`${styles.dropdown__button} ${isPerPageOpen ? styles['dropdown__button--active'] : ''}`}
            onClick={() => setIsPerPageOpen(prev => !prev)}
          >
            {perPageFromURL}
          </button>

          {isPerPageOpen && (
            <ul className={`${styles.dropdown__content} ${styles.content}`}>
              {perPageOptions.map(option => (
                <li
                  key={option}
                  className={styles.content__item}
                  onClick={() => {
                    setSearchParams(prev => {
                      const params = new URLSearchParams(prev);

                      params.set('itemsPerPage', String(option));
                      params.set('page', '1');

                      return params;
                    });

                    setIsPerPageOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.products__container}>
        <ProductsList products={currentItems} category={category} />
      </div>

      {/* PAGINATION */}
      <Pagination
        total={items.length}
        currentPage={pageFromURL}
        perPage={perPageFromURL}
        onPageChange={setPage}
      />
    </section>
  );
};
