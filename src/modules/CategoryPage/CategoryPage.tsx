import React from 'react';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';
import { useProducts } from '../shared/hooks/useProducts';
import { CustomSelect } from '../shared/components/CustomSelect';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './CategoryPage.module.scss';
import { getPublicPath } from '../shared/utils/getPublicPath';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
};

type SortType = 'age' | 'price' | 'name';
type PerPageOption = 4 | 8 | 16 | 'all';

export const CategoryPage: React.FC<Props> = ({ category }) => {
  const { products, loading, error, refetch } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const filtered = products.filter(p => p.category === category);

  const sortBy = (searchParams.get('sort') as SortType) || 'age';
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage');

  const itemsPerPage: PerPageOption =
    perPageParam === 'all'
      ? 'all'
      : perPageParam
        ? (Number(perPageParam) as PerPageOption)
        : 'all';

  const handleSortChange = (value: SortType) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'age') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    setSearchParams(params);
  };

  const handlePerPageChange = (value: PerPageOption) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', String(value));
    }

    params.delete('page');
    setSearchParams(params);
  };

  const firstUL = (word: string) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'age':
      default:
        return b.year - a.year;
    }
  });

  const realItemsPerPage =
    itemsPerPage === 'all' ? sorted.length : itemsPerPage;
  const totalPages =
    realItemsPerPage > 0 ? Math.ceil(sorted.length / realItemsPerPage) : 1;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  let visiblePages = pageNumbers;

  if (totalPages > 5) {
    const firstVisiblePage = Math.min(
      Math.max(currentPage - 2, 1),
      totalPages - 4,
    );

    visiblePages = Array.from(
      { length: 5 },
      (_, index) => firstVisiblePage + index,
    );
  }

  const startIndex = (currentPage - 1) * realItemsPerPage;
  const currentItems = sorted.slice(startIndex, startIndex + realItemsPerPage);

  const sortOptions = [
    { value: 'age', label: 'Newest' },
    { value: 'price', label: 'Cheapest' },
    { value: 'name', label: 'Alphabetically' },
  ];

  const perPageOptions = [
    { value: 'all', label: 'All' },
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
  ];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p>Something went wrong</p>
        <button type="button" onClick={() => refetch()}>
          Reload
        </button>
      </div>
    );
  }

  const categoryTitles: Record<string, string> = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  return (
    <div className={styles.container}>
      <div className={styles.categoryPage}>
        <div className={styles.categoryPageNav}>
          <NavLink to="/" className={styles.categoryPageIcon}>
            <img src={getPublicPath('/img/Home.svg')} alt="homeIcon" />
          </NavLink>
          <span
            className={`${styles.categoryPageIcon} ${styles.categoryPageArrow}`}
          >
            <img src={getPublicPath('img/comon-arrow.svg')} alt="arrow" />
          </span>
          <NavLink to={`/${category}`} className={styles.categoryPageLink}>
            {firstUL(category)}
          </NavLink>
        </div>

        <h1 className={styles.categoryPageTitle}>{categoryTitles[category]}</h1>

        <h2 className={styles.categoryPageCount}>{filtered.length} models</h2>

        {filtered.length === 0 ? (
          <p>There are no {category} yet</p>
        ) : (
          <>
            <div className={styles.categoryPageOptions}>
              <div>
                <h3 className={styles.categoryPageOptionsTitle}>Sort by</h3>
                <CustomSelect
                  value={sortBy}
                  onChange={val => handleSortChange(val as SortType)}
                  options={sortOptions}
                  customClass="Wider"
                />
              </div>

              <div>
                <h3 className={styles.categoryPageOptionsTitle}>
                  Items on page
                </h3>
                <CustomSelect
                  value={String(itemsPerPage)}
                  onChange={val =>
                    handlePerPageChange(
                      val === 'all' ? 'all' : (Number(val) as PerPageOption),
                    )
                  }
                  options={perPageOptions}
                />
              </div>
            </div>

            <ProductsList products={currentItems} />

            {totalPages > 1 && itemsPerPage !== 'all' && (
              <div className={styles.pagination}>
                <div className={styles.categoryPageButtons}>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`${styles.categoryPageButton} ${styles.categoryPageButtonLeft}`}
                    disabled={currentPage === 1}
                  >
                    <img
                      className={styles.categoryPageButtonImg}
                      src={
                        currentPage === 1
                          ? getPublicPath('/img/comon-arrow.svg')
                          : getPublicPath('/img/active-arrow.svg')
                      }
                      alt="arrow"
                    />
                  </button>

                  <div className={styles.categoryPageButtonsContainer}>
                    {visiblePages.map(page => (
                      <button
                        key={page}
                        className={
                          page === currentPage
                            ? `${styles.categoryPageButtonActive} ${styles.categoryPageButton}`
                            : styles.categoryPageButton
                        }
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`${styles.categoryPageButton} ${styles.categoryPageButtonRight}`}
                    disabled={currentPage === totalPages}
                  >
                    <img
                      className={styles.categoryPageButtonImg}
                      src={
                        currentPage === totalPages
                          ? getPublicPath('img/comon-arrow.svg')
                          : getPublicPath('img/active-arrow.svg')
                      }
                      alt="arrow"
                    />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
