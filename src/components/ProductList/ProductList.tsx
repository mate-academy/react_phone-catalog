import { FC, useState, useEffect, useCallback } from 'react';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../services/Product';
import { Category } from '../../types/Category';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';
import { Select } from '../Select';
import { FilterType, ItemsPerPage } from '../../types/Filter';
// eslint-disable-next-line
import { SkeletonProductList } from '../SkeletonProductList/SkeletonProductList';
import { useSearchParams } from 'react-router-dom';

interface Props {
  category: Category;
  title: string;
}

export const ProductList: FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = searchParams.get('sort') || FilterType.age;
  const perPage = searchParams.get('perPage') || ItemsPerPage.All;

  const productCount = products.length;

  const handleSortChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({
        sort: event.target.value,
        page: '1',
      });
    },
    [setSearchParams],
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

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const data = await getProductsByCategory(category);

        setProducts(data);
      } finally {
        setIsLoading(false);
      }
    };

    const delay = setTimeout(() => {
      if (category) {
        fetchPhones();
      }
    }, 300);

    return () => {
      clearTimeout(delay);
    };
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <SkeletonProductList isLoading={isLoading} />;
  }

  return (
    <div className="">
      <div className={styles.productTop}>
        <div className={styles.breadcrumbs}></div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.count}>
          {`${productCount} item${products.length > 1 ? 's' : ''}`}
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
        {products.map(item => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
      <div className={styles.pagination}></div>
    </div>
  );
};
