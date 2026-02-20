import styles from './AccessoriesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import productsFromServer from '../../../../public/api/products.json';

const ACCESSORIES = productsFromServer.filter(
  item => item.category === 'accessories',
);

export const AccessoriesPage = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Accessories', to: '/accessories' }]} />
        <ProductsList title="Accessories" products={ACCESSORIES} />
      </div>
    </main>
    <Footer />
  </>
);
