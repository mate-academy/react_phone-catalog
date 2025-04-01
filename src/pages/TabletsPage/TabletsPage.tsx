import { useProducts } from '../../context/ProductsContext';
import styles from './TabletsPage.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import ProductsList from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  itemsForPageOptions,
  sortingOptions,
  updateProducts,
} from '../../utils';
import Skeleton from '../../components/Skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Pagination } from '../../components/Pagination';

const TabletsPage = () => {
  const { products, error } = useProducts();

  const [tablets, setTablets] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const page = searchParams.get('page') || '1';

  const tabletsLength = products.filter(p => p.category === 'tablets').length;

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const updatedTablets = updateProducts(
        products,
        perPage === 'all' ? 'all' : +perPage,
        sort,
        +page,
        'tablets'
      );
      setTablets(updatedTablets);
      setLoading(false);
    }, 1000);
  }, [products, perPage, sort, page]);

  if (products.length === 0) {
    return <h2 className={styles.title}>There are no tablets yet</h2>;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.tablets}>
      <Breadcrumbs />

      <h1 className={styles.title}>Tablets</h1>

      <p className={styles.tablets__quantity}>{tablets.length} models</p>

      <div className={styles.tablets__selects}>
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

      <ProductsList products={tablets} />

      {perPage !== 'all' && (
        <Pagination
          total={tabletsLength}
          perPage={+perPage}
          currentPage={+page}
        />
      )}
    </div>
  );
};

export default TabletsPage;
