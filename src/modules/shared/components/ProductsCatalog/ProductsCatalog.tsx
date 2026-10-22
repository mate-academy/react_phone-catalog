import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getProducts } from '../../../../services/products';
import type { Product } from '../../../../types';
import { ProductCard } from '../ProductCard';

import styles from './ProductsCatalog.module.scss';
import { Breadcrumbs } from '../Breadcrumbs';

type SortBy = 'age' | 'title' | 'price';
type Category = 'phones' | 'tablets' | 'accessories';

type Props = {
  title: string;
  category: Category;
};

export const ProductsCatalog = ({ title, category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const sortBy: SortBy =
    sortParam === 'title' || sortParam === 'price' ? sortParam : 'age';

  const pageParam = Number(searchParams.get('page'));
  const currentPage =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const perPageParam = searchParams.get('perPage');
  const parsedPerPage = perPageParam === null ? 16 : Number(perPageParam);
  const perPage = [0, 4, 8, 16].includes(parsedPerPage) ? parsedPerPage : 16;

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {
        setError('Unable to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts = products
    .filter(product => product.category === category)
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.name.localeCompare(b.name);

        case 'price':
          return a.price - b.price;

        case 'age':
        default:
          return b.year - a.year;
      }
    });

  const totalPages =
    perPage === 0
      ? 1
      : Math.max(1, Math.ceil(filteredProducts.length / perPage));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const maxVisiblePages = 5;

  const startPage = Math.max(
    1,
    Math.min(safeCurrentPage - 2, totalPages - maxVisiblePages + 1),
  );

  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const startIndex = (safeCurrentPage - 1) * perPage;

  const visibleProducts =
    perPage === 0
      ? filteredProducts
      : filteredProducts.slice(startIndex, startIndex + perPage);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(page));
    setSearchParams(params);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className={styles.page}>
      <Breadcrumbs category={category} />

      <h1 className={styles.title}>{title}</h1>

      <p className={styles.count}>{filteredProducts.length} models</p>

      <div className={styles.filters}>
        <div className={styles.controls}>
          <label htmlFor="sortBy">Sort by</label>

          <select
            id="sortBy"
            value={sortBy}
            onChange={event => {
              const params = new URLSearchParams(searchParams);

              params.set('sort', event.target.value);
              params.set('page', '1');

              setSearchParams(params);
            }}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.controls}>
          <label htmlFor="perPage">Items on page</label>

          <select
            id="perPage"
            value={perPage}
            onChange={event => {
              const params = new URLSearchParams(searchParams);

              params.set('perPage', event.target.value);
              params.set('page', '1');

              setSearchParams(params);
            }}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={0}>All</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          type="button"
          disabled={safeCurrentPage <= 1}
          onClick={() => changePage(safeCurrentPage - 1)}
        >
          Previous
        </button>

        {pageNumbers.map(page => (
          <button
            key={page}
            type="button"
            className={safeCurrentPage === page ? styles.activePage : ''}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={safeCurrentPage >= totalPages}
          onClick={() => changePage(safeCurrentPage + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
};
