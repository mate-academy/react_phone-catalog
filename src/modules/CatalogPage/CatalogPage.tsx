import { useContext } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import { DataContext } from '../../context/DataContext';
import styles from './CatalogPage.module.scss';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';

const CATEGORIES = ['phones', 'tablets', 'accessories'] as const;

type Category = (typeof CATEGORIES)[number];

const sortOptions = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
} as const;

type SortType = keyof typeof sortOptions;

export const CatalogPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, error } = useContext(DataContext);

  if (!category || !CATEGORIES.includes(category as Category)) {
    return <Navigate to="/not-found" replace />;
  }

  const filteredProducts = products.filter(p => p.category === category);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (filteredProducts.length === 0) {
    return <p>There are no {category} yet</p>;
  }

  // --- SORTING  ---
  const sortParam = (searchParams.get('sort') as SortType) || 'age';

  const sorted = [...filteredProducts].sort((a, b) => {
    switch (sortParam) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year;
    }
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (newSort === 'age') {
        params.delete('sort');
      } else {
        params.set('sort', newSort);
      }

      return params;
    });
  };

  // --- PER PAGE ---

  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const perPageParam = searchParams.get('perPage') || 'all';

  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const perPage = perPageParam === 'all' ? 'all' : parseInt(perPageParam, 10);

  const startIndex = typeof perPage === 'number' ? (page - 1) * perPage : 0;
  const endIndex =
    typeof perPage === 'number' ? startIndex + perPage : undefined;
  const paginatedProducts =
    typeof perPage === 'number' ? sorted.slice(startIndex, endIndex) : sorted;

  const totalPages =
    typeof perPage === 'number' ? Math.ceil(sorted.length / perPage) : 1;

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = e.target.value;

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (newPerPage === 'all') {
        params.delete('perPage');
      } else {
        params.set('perPage', newPerPage);
      }

      params.delete('page');

      return params;
    });
  };

  return (
    <section className={styles.catalog}>
      <div className="container">
        <Breadcrumbs
          items={[
            {
              label: category.charAt(0).toUpperCase() + category.slice(1),
              path: `/${category}`,
            },
          ]}
        />
        <h1 className={styles.catalog__title}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        <p className={styles.catalog__count}>{filteredProducts.length} items</p>

        <div className={styles.catalog__controls}>
          <div className={styles.catalog__sort}>
            <label className={styles.catalog__label} htmlFor="sort">
              Sort by:
            </label>
            <select
              name="sort"
              value={sortParam}
              onChange={handleSortChange}
              className={styles.catalog__select}
            >
              {Object.entries(sortOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.catalog__perPage}>
            <label className={styles.catalog__label} htmlFor="perPage">
              Items per page:
            </label>
            <select
              name="perPage"
              value={perPageParam}
              onChange={handlePerPageChange}
              className={styles.catalog__select}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        <div className={styles.catalog__list}>
          {paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {perPage !== 'all' && totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} />
        )}
      </div>
    </section>
  );
};
