import styles from './TabletsPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import { useProducts } from '../../hooks/use-products';
import { Loader } from '../../../components/Loader';
import { SortProducts } from '../../utils/SortProducts';
import { PerPage } from '../../utils/PerPage';
import { useSearchParams } from 'react-router-dom';

export const TabletsPage = () => {
  const { products, loading, error } = useProducts();

  const [searchParam] = useSearchParams();
  const sortBy = searchParam.get('sortBy') || 'newest';
  const perPage = searchParam.get('perPage') || 'all';

  let Tablets = SortProducts(
    [...products].filter(item => item.category === 'tablets'),
    sortBy,
  );

  Tablets = PerPage(Tablets, perPage);

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
          <Breadcrumbs items={[{ label: 'Tablets', to: '/tablets' }]} />
          <ProductsList title="Tablets" products={Tablets} />
        </div>
      </main>
      <Footer />
    </>
  );
};
