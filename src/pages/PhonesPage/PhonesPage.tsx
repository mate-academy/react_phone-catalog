// PhonesPage.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useProducts } from '../../context/ProductsContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import ProductsList from '../../components/ProductsList/ProductsList';
import PaginationBlock from '../../components/PaginationBlock/PaginationBlock';
import Skeleton from '../../components/Skeleton/Skeleton';
import {
  itemsForPageOptions,
  sortingOptions,
  updateProducts,
} from '../../utils';
import styles from './PhonesPage.module.scss';

const PhonesPage = () => {
  const { products } = useProducts();
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const page = searchParams.get('page') || '1';

  const paginationLength = Math.ceil(
    products.filter(p => p.category === 'phones').length / +perPage,
  );

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const updatedPhones = updateProducts(
        products,
        perPage === 'all' ? 'all' : +perPage,
        sort,
        +page,
      );
      setPhones(updatedPhones);
      setLoading(false);
    }, 1000);
  }, [products, perPage, sort, page]);

  // ! змінити всі остальні сторінки

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', value.toString());
    setSearchParams(params);
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.phones}>
      <Breadcrumbs />

      <h1 className={styles.title}>Mobile Phones</h1>

      <p className={styles.phones__quantity}>{phones.length} models</p>

      <div className={styles.phones__selects}>
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

      <ProductsList products={phones} />

      {perPage !== 'all' && (
        <PaginationBlock
          handlePageChange={handlePageChange}
          page={page}
          paginationLength={paginationLength}
        />
      )}
    </div>
  );
};

export default PhonesPage;
