import styles from './HomePage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Banner } from '../../../components/Banner';
import { ProductSlider } from '../../../components/ProductSlider';
import { ShopByCategory } from '../../../components/ShopByCategory';

import productsFromServer from '../../../../public/api/products.json';

function sortedYearProduct(sortBy: string) {
  return [...productsFromServer].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return bVal - aVal;
    }
  });
}

function sortedDiscountProduct() {
  return [...productsFromServer].sort((a, b) => {
    const aVal = a.fullPrice - a.price;
    const bVal = b.fullPrice - b.price;

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return bVal - aVal;
    }
  });
}

const NEW_MODELS = sortedYearProduct('year');
const HOT_PRICES = sortedDiscountProduct();

export const HomePage = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>Welcome to Nice Gadgets store!</h1>
        <Banner />
        <ProductSlider title="Brand new models" products={NEW_MODELS} />
        <ShopByCategory />
        <ProductSlider title="Hot prices" products={HOT_PRICES} />
      </div>
    </main>
    <Footer />
  </>
);
