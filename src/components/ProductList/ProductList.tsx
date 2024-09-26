import { FC, useState, useEffect, useCallback } from 'react';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../services/Product';
import { ProductCard } from '../ProductCard';
import { Select } from '../Select';
import { FilterType, ItemsPerPage } from '../../types/Filter';
// eslint-disable-next-line
import { SkeletonProductList } from '../SkeletonProductList/SkeletonProductList';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';
import { sortProducts } from '../../utils/sortFilter';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import styles from './ProductList.module.scss';
import { Category } from '../../types/Category';

interface Props {
  title?: string;
}

export const ProductList: FC<Props> = ({ title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const page = parseInt(searchParams.get('page') || '1');
  const perPage = searchParams.get('perPage') || ItemsPerPage.All;
  const sortType = searchParams.get('sort') || 'age';

  const actualPerPage = perPage === 'All' ? products.length : parseInt(perPage);
  const total = products.length;
  const startIndex = (page - 1) * actualPerPage;
  const sortedProducts = sortProducts(products, sortType);
  const selectedProducts = sortedProducts.slice(
    startIndex,
    startIndex + actualPerPage,
  );

  const category = location.pathname.split('/')[1] as Category;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory(category);

        setProducts(data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } finally {
        setIsLoading(false);
      }
    };

    const delay = setTimeout(() => {
      if (category) {
        fetchProducts();
      }
    }, 250);

    return () => {
      clearTimeout(delay);
    };
  }, [category]);

  const handleSortChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({
        sort: event.target.value,
        page: '1',
        perPage,
      });
    },
    [setSearchParams, perPage],
  );

  const handlePerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({
        perPage: event.target.value,
        page: '1',
        sort: sortType,
      });
    },
    [setSearchParams, sortType],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams({ page: String(newPage), perPage, sort: sortType });
    },
    [setSearchParams, perPage, sortType],
  );

  if (isLoading) {
    return <SkeletonProductList isLoading={isLoading} />;
  }

  return (
    <div className="">
      <div className={styles.productTop}>
        <Breadcrumbs />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.count}>
          {`${products.length} item${products.length > 1 ? 's' : ''}`}
        </p>
      </div>

      <div className={styles.productFilters}>
        <Select
          label="Sort by"
          onChange={handleSortChange}
          value={sortType}
          options={Object.entries(FilterType).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
        />

        <Select
          label="Items per page"
          onChange={handlePerPageChange}
          value={perPage}
          options={Object.values(ItemsPerPage).map(value => ({
            value,
            label: value,
          }))}
        />
      </div>
      <div className={styles.productList}>
        {selectedProducts.map(item => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
      <div className={styles.pagination}>
        {perPage !== 'All' && (
          <Pagination
            total={total}
            perPage={actualPerPage}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
