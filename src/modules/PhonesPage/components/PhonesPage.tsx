import styles from './PhonesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import { Loader } from '../../../components/Loader';
import { useProducts } from '../../hooks/use-products';
import { useSearchParams } from 'react-router-dom';
import { SortProducts } from '../../utils/SortProducts';
import { PerPage } from '../../utils/PerPage';

export const PhonesPage = () => {
  const { products, loading, error } = useProducts();

  const [searchParam] = useSearchParams();
  const sortBy = searchParam.get('sortBy') || 'newest';
  const perPage = searchParam.get('perPage') || 'all';

  let Phones = SortProducts(
    [...products].filter(item => item.category === 'phones'),
    sortBy,
  );

  Phones = PerPage(Phones, perPage);

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
