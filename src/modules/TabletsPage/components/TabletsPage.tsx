import styles from './TabletsPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import { useProducts } from '../../hooks/use-products';
import { Loader } from '../../../components/Loader';

export const TabletsPage = () => {
  const { products, loading, error } = useProducts();

  const Tablets = [...products].filter(item => item.category === 'tablets');

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
