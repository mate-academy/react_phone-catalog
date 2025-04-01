import { useProducts } from '../../context/ProductsContext';
import styles from './AccessoriesPage.module.scss';
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
import { Pagination } from '../../components/Pagination';

const AccessoriesPage = () => {
  const { products } = useProducts();
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const page = searchParams.get('page') || '1';

  const accessoriesLength = products.filter(
    p => p.category === 'accessories',
  ).length;

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const updatedAccessories = updateProducts(
        products,
        perPage === 'all' ? 'all' : +perPage,
        sort,
        +page,
        'accessories'
      );
      setAccessories(updatedAccessories);
      setLoading(false);
    }, 1000);
  }, [products, perPage, sort, page]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.accessories}>
      <Breadcrumbs />

      <h1 className={styles.title}>Accessories</h1>

      <p className={styles.accessories__quantity}>
        {accessories.length} models
      </p>

      <div className={styles.accessories__selects}>
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

      <ProductsList products={accessories} />

      {perPage !== 'all' && (
        <Pagination
          total={accessoriesLength}
          perPage={+perPage}
          currentPage={+page}
        />
      )}
    </div>
  );
};

export default AccessoriesPage;
