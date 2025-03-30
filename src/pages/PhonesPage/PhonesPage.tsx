import { useProducts } from '../../context/ProductsContext';
import styles from './PhonesPage.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import ProductsList from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PaginationBlock from '../../components/PaginationBlock/PaginationBlock';
import { itemsForPageOptions, sortingOptions } from '../../utils';
import Skeleton from '../../components/Skeleton/Skeleton';

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

  function updateProducts(
    itemsPerPage: number | 'all',
    sortOrder: string,
    currentPage: number,
  ) {
    if (products.length === 0) {
      return;
    }

    let filteredPhones = products.filter(p => p.category === 'phones');

    if (sortOrder === 'alphabetically') {
      filteredPhones.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'cheapest') {
      filteredPhones.sort((a, b) => a.price - b.price);
    }

    if (itemsPerPage === 'all') {
      setPhones(filteredPhones);
    } else {
      const startIndex = (currentPage - 1) * itemsPerPage;
      setPhones(filteredPhones.slice(startIndex, startIndex + itemsPerPage));
    }
  }

  useEffect(() => {
    updateProducts(perPage === 'all' ? 'all' : +perPage, sort, +page);
  }, [perPage, sort, page]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      updateProducts(perPage === 'all' ? 'all' : +perPage, sort, +page);
      setLoading(false);
    }, 1000);
  }, [products]);

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
