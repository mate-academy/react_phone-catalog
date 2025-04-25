import styles from './ProductsPages.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import ProductsList from '../../components/ProductsList/ProductsList';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  filterAndSortProducts,
  itemsForPageOptions,
  sortingOptions,
  structureProducts,
} from '../../utils';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Pagination } from '../../components/Pagination';
import Loader from '../../components/Loader/Loader';
import { Gadget } from '../../types/Gadgets';

type Props = {
  products: Gadget[];
  error: boolean;
  loading: boolean;
  title: string;
};

export const ProductsPages: React.FC<Props> = ({
  products,
  error,
  loading,
  title,
}) => {
  const [searchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const page = searchParams.get('page') || '1';

  const structuredProducts = useMemo(
    () => structureProducts(products),
    [products],
  );

  const { total, items } = useMemo(
    () =>
      filterAndSortProducts(
        structuredProducts,
        sort,
        perPage === 'all' ? 'all' : +perPage,
        +page,
      ),
    [perPage, sort, page, structuredProducts],
  );

  if (loading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return <h2 className={styles.title}>There are no tablets yet</h2>;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className={styles.products}>
      <Breadcrumbs />

      <h1 className={styles.title}>{title}</h1>

      <p className={styles.products__quantity}>{products.length} models</p>

      <div className={styles.products__selects}>
        <CustomSelect
          label="Sort by"
          options={sortingOptions}
          paramName="sort"
        />
        <CustomSelect
          label="Items on page"
          options={itemsForPageOptions}
          paramName="perPage"
        />
      </div>

      <ProductsList products={items} />

      {perPage !== 'all' && (
        <Pagination total={total} perPage={+perPage} currentPage={+page} />
      )}
    </div>
  );
};
