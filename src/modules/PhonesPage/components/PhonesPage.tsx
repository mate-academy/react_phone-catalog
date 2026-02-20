import styles from './PhonesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import { Loader } from '../../../components/Loader';
import { useProducts } from '../../hooks/use-products';

export const PhonesPage = () => {
  const { products, loading, error } = useProducts();

  const Phones = [...products].filter(item => item.category === 'phones');

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
          <Breadcrumbs items={[{ label: 'Phones', to: '/phones' }]} />
          <ProductsList title="Mobile phones" products={Phones} />
        </div>
      </main>
      <Footer />
    </>
  );
};
