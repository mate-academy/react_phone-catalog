import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory } from '../../api/products';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';
import { Dropdown } from '../shared/components/Dropdown';
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  isSortType,
  sortProducts,
} from './utils/sorting';
import styles from './ProductsPage.module.scss';

const TITLES: Record<Category, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

interface Props {
  category: Category;
}

export const ProductsPage = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const sort = isSortType(sortParam) ? sortParam : DEFAULT_SORT;

  useEffect(() => {
    let isCurrent = true;

    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(data => {
        if (isCurrent) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [category, reloadCount]);

  const reload = () => setReloadCount(count => count + 1);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <div className={styles.message}>
          <p>Something went wrong</p>

          <button type="button" className={styles.reload} onClick={reload}>
            Reload
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return <p className={styles.message}>There are no {category} yet</p>;
    }

    return (
      <>
        <p className={styles.count}>{products.length} models</p>

        <div className={styles.controls}>
          <Dropdown
            label="Sort by"
            value={sort}
            options={SORT_OPTIONS}
            onChange={handleSortChange}
            className={styles.sortDropdown}
          />
        </div>

        <ProductsList products={sortProducts(products, sort)} />
      </>
    );
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{TITLES[category]}</h1>

      {renderContent()}
    </div>
  );
};
