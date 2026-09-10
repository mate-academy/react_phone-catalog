import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { ProductCard } from '../shared/components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import styles from './ProductsPage.module.scss';

interface Props {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
}

export const ProductsPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPageParam = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data: Product[]) => {
        const filtered = data.filter(item => item.category === category);

        setProducts(filtered);
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
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
  }, [products, sortBy]);

  const perPage =
    perPageParam === 'all' ? sortedProducts.length : Number(perPageParam);
  const totalPages = Math.ceil(sortedProducts.length / perPage) || 1;

  const visibleProducts = useMemo(() => {
    if (perPageParam === 'all') {
      return sortedProducts;
    }

    const start = (currentPage - 1) * perPage;

    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, currentPage, perPage, perPageParam]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.productsPage}>
      <Breadcrumbs />
      <h1 className={styles.productsPage__title}>{title}</h1>
      <p className={styles.productsPage__count}>{products.length} models</p>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.productsPage__filters}>
            <div className={styles.productsPage__field}>
              <label htmlFor="sort" className={styles.productsPage__label}>
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className={styles.productsPage__select}
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </div>

            <div className={styles.productsPage__field}>
              <label htmlFor="perPage" className={styles.productsPage__label}>
                Items on page
              </label>
              <select
                id="perPage"
                value={perPageParam}
                onChange={handlePerPageChange}
                className={styles.productsPage__select}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          <div className={styles.productsPage__grid}>
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {perPageParam !== 'all' && totalPages > 1 && (
            <div className={styles.productsPage__pagination}>
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={styles.productsPage__pageBtn}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`${styles.productsPage__pageBtn} ${
                    page === currentPage
                      ? styles.productsPage__pageBtnActive
                      : ''
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={styles.productsPage__pageBtn}
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
