import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { mapProductToCard } from '../../utils/mapProductToCard';
import { useProducts } from '../../hooks/useProducts';
import styles from './CatalogPage.module.scss';
import { SelectProduct } from './SelectProduct/SelectProduct';
import { Pagination } from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';

type SortType = 'age' | 'title' | 'price';
type Category = 'phones' | 'tablets' | 'accessories';

type Props = {
  category: Category;
};

export const CatalogPage: React.FC<Props> = ({ category }) => {
  const categoryTitles = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };
  const { products } = useProducts();

  // const phones = useMemo(
  //   () =>
  //     products
  //       .filter(product => product.category === 'phones')
  //       .map(mapProductToCard),
  //   [products],
  // );
  const catalogProducts = useMemo(
    () =>
      products
        .filter(product => product.category === category)
        .map(mapProductToCard),
    [products, category],
  );

  // const [itemsPerPage, setItemsPerPage] = useState(16);
  // const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useState<SortType>('age');

  const sortedProducts = useMemo(() => {
    const result = [...catalogProducts];

    switch (sortBy) {
      case 'title':
        return result.sort((a, b) => a.name.localeCompare(b.name));

      case 'price':
        return result.sort((a, b) => a.price - b.price);

      case 'age':
        return result.sort((a, b) => b.year - a.year);

      default:
        return result;
    }
  }, [catalogProducts, sortBy]);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);

  const perPageParam = searchParams.get('perPage') || 'all';

  const itemsPerPage =
    perPageParam === 'all' || isNaN(Number(perPageParam))
      ? sortedProducts.length
      : Number(perPageParam);

  const updateParams = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (!value) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const totalPages =
    perPageParam === 'all'
      ? 1
      : Math.ceil(sortedProducts.length / itemsPerPage);

  const visibleProducts =
    perPageParam === 'all'
      ? sortedProducts
      : sortedProducts.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        );

  const getPages = (page: number, total: number): (number | string)[] => {
    const delta = 1;

    const range: (number | string)[] = [];

    const left = Math.max(2, page - delta);
    const right = Math.min(total - 1, page + delta);

    range.push(1);

    if (left > 2) {
      range.push('...');
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) {
      range.push('...');
    }

    if (total > 1) {
      range.push(total);
    }

    return range;
  };

  const pages = getPages(currentPage, totalPages);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      updateParams({
        page: totalPages === 1 ? null : String(totalPages),
      });
    }
  }, [currentPage, totalPages, updateParams]);

  if (!products.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.catalog}>
      <Breadcrumbs />

      <h2 className={styles.title}>{categoryTitles[category]}</h2>

      <p className={styles.catalogCount}>{catalogProducts.length} models</p>

      <div className={styles.catalogSorts}>
        <SelectProduct
          label="Sort by"
          value={sortBy}
          onChange={val => {
            setSortBy(val as SortType);
            updateParams({
              page: null,
              perPage: perPageParam === '8' ? null : perPageParam,
            });
          }}
          options={[
            { label: 'Newest', value: 'age' },
            { label: 'Alphabetically', value: 'title' },
            { label: 'Cheapest', value: 'price' },
          ]}
        />

        <SelectProduct
          label="Items on page"
          value={perPageParam}
          onChange={val => {
            updateParams({
              page: null,
              perPage: val === '8' ? null : String(val),
            });
          }}
          options={[
            { label: '4', value: '4' },
            { label: '8', value: '8' },
            { label: '16', value: '16' },
            { label: 'All', value: 'all' },
          ]}
        />
      </div>

      <div className={styles.catalogGrid}>
        {visibleProducts.map(item => (
          <ProductCard key={item.id} {...item} showDiscount />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          totalPages={totalPages}
          updateParams={updateParams}
        />
      )}
    </div>
  );
};
