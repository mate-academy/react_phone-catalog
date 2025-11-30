import { useEffect, useState } from 'react';
import { PhoneCard } from '../GoodCard/GoodCard';
import { Product } from '../../interfaces/Product';
import { useProductsFilter } from '../../hooks/useProductsFilters';
import styles from './ProductsList.module.scss';
import { Loader } from '../Loader/Loader';
import emptyImage from '../../../../../public/img/product-not-found.png';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { EmptyMessage } from '../EmptyMessage/EmptyMessage';
import { PaginationItems } from '../CatalogPagination/CatalogPagination';
import { PageItemsSelect } from '../ItemPageSelect/ItemPageSelect';
import { SortSelect } from '../SortItemsSelect/SortItemsSelect';

interface ProductsListProps {
  type: 'phones' | 'tablets' | 'accessories';
  title: string;
}

export const ProductsList: React.FC<ProductsListProps> = ({ type, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { sort, page, perPage, setSort, setPerPage, setPage } =
    useProductsFilter();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch('./api/products.json');

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Product[] = await res.json();

        setProducts(data.filter(p => p.category === type));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [type]);

  const sorted = [...products].sort((a, b) => {
    switch (sort) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return Number(a.price) - Number(b.price);
      default:
        return Number(b.id) - Number(a.id);
    }
  });

  const perPageNum = perPage === 'all' ? sorted.length : Number(perPage);
  const start = (page - 1) * perPageNum;
  const visible =
    perPage === 'all' ? sorted : sorted.slice(start, start + perPageNum);
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sorted.length / perPageNum);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage onReload={() => window.location.reload()} />;
  }

  if (products.length === 0) {
    return (
      <EmptyMessage imageSrc={emptyImage} text={`There are no ${type} yet`} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.catalogTitle}>{title}</h2>

      {visible.length > 0 && (
        <p className={styles.catalogText}>{sorted.length} models</p>
      )}

      <div className={styles.controls}>
        <SortSelect sort={sort} handleSortChange={setSort} />
        <PageItemsSelect perPage={perPage} handlePerPageChange={setPerPage} />
      </div>

      <div className={styles.grid}>
        {visible.length === 0 ? (
          <EmptyMessage
            imageSrc={emptyImage}
            text={`There are no ${type} yet`}
          />
        ) : (
          visible.map(p => <PhoneCard key={p.id} product={p} />)
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <PaginationItems
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};
