import { useProducts } from '../../context/ProductsContext';
import styles from './PhonesPage.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import ProductsList from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const sortingOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Alphabetically', value: 'alphabetically' },
  { label: 'Cheapest', value: 'cheapest' },
];

const itemsForPageOptions = [
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: 'All', value: 'all' },
];

const PhonesPage = () => {
  const { products } = useProducts();
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // const perPage = searchParams.get('perPage');

  function updateProducts(itemsPerPage: number | 'all' = 'all') {
    if (itemsPerPage !== 'all') {
      searchParams.set('perPage', itemsPerPage.toString());
      setSearchParams(searchParams);
    }

    if (products.length === 0) {
      return;
    }

    const filteredPhones = products.filter(p => p.category === 'phones');

    if (itemsPerPage === 'all') {
      setPhones(filteredPhones);
    } else {
      setPhones(filteredPhones.slice(0, itemsPerPage));
    }
  }

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      updateProducts('all');
      setLoading(false);
    }, 1000);
  }, [products]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
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
          updateProducts={updateProducts}
        />
        <CustomSelect
          label="Items on page"
          options={itemsForPageOptions}
          updateProducts={updateProducts}
        />
      </div>

      <ProductsList products={phones} />
    </div>
  );
};

export default PhonesPage;
