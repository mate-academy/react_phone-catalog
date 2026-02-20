import styles from './PhonesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';
import productsFromServer from '../../../../public/api/products.json';

const PHONES = productsFromServer.filter(item => item.category === 'phones');

export const PhonesPage = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Phones', to: '/phones' }]} />
        <ProductsList title="Mobile phones" products={PHONES} />
      </div>
    </main>
    <Footer />
  </>
);
