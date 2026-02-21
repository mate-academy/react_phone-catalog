import styles from './AccessoriesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import { useProducts } from '../../hooks/use-products';
import { Loader } from '../../../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { SortProducts } from '../../utils/SortProducts';
import { PerPage } from '../../utils/PerPage';

export const AccessoriesPage = () => {
  const { products, loading, error } = useProducts();

  const [searchParam] = useSearchParams();
  const sortBy = searchParam.get('sortBy') || 'newest';
  const perPage = searchParam.get('perPage') || 'all';

  let Accessories = SortProducts(
    [...products].filter(item => item.category === 'accessories'),
    sortBy,
  );

  Accessories = PerPage(Accessories, perPage);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Breadcrumbs items={[{ label: 'Accessories', to: '/accessories' }]} />
          <ProductsList title="Accessories" products={Accessories} />
        </div>
      </main>
      <Footer />
    </>
  );
};
