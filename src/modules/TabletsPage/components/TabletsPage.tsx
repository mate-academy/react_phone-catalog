import styles from './TabletsPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import productsFromServer from '../../../../public/api/products.json';

const TABLETS = productsFromServer.filter(item => item.category === 'tablets');

export const TabletsPage = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Tablets', to: '/tablets' }]} />
        <ProductsList title="Tablets" products={TABLETS} />
      </div>
    </main>
    <Footer />
  </>
);
