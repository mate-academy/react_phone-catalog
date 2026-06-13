import { useEffect, useState } from 'react';

import styles from './ProductsCatalog.module.scss';
import { Product } from '../../types/Product';
import { useCatalogParams } from '../../utils/useCatalogParams';
import { getProducts } from '../../../api/products';
import { sortProducts } from '../../utils/sortProducts';
import { pagination } from '../../utils/pagination';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { EmptyState } from '../EmptyState';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductList } from '../ProductList';
import { Pagination } from '../Pagination';

type Props = {
  category: string;
  title: string;
};

export const ProductsCatalog: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { sort, setSort, currentPage, setCurrentPage, perPage, setPerPage } =
    useCatalogParams();

  useEffect(() => {
    getProducts()
      .then((data: Product[]) => {
        setProducts(data.filter(product => product.category === category));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [category]);

  const sortedProducts = sortProducts(products, sort);

  const { productsToShow, totalPages } = pagination(
    sortedProducts,
    currentPage,
    perPage,
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message="Product was not found" />;
  }

  if (!products.length) {
    return <EmptyState productCategory={category} />;
  }

  return (
    <div className={styles.pageGrid}>
      <div className={styles.products__breadcrumbs}>
        <Breadcrumbs title={category} />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.modelsCount}>{`${products.length} models`}</p>

      <div className={styles.catalogControle}>
        <form>
          <label htmlFor="sort" className={styles.label}>
            Sort by
            <select
              id="sort"
              className={styles.sortSelect}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </label>
        </form>

        <form>
          <label htmlFor="perPage" className={styles.label}>
            Items on page
            <select
              id="perPage"
              value={perPage}
              className={styles.perPageSelect}
              onChange={e => {
                const value = e.target.value;

                setCurrentPage(1);
                if (value === 'all') {
                  setPerPage('all');
                } else {
                  setPerPage(value);
                }
              }}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>
          </label>
        </form>
      </div>

      <ProductList className={styles.products} products={productsToShow} />

      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
