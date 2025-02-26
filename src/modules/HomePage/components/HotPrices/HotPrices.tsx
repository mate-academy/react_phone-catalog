import styles from './HotPrices.module.scss';
import products from '../../../../../public/api/products.json';
import { ProductSlider } from '../../../Shared/ProductsSlider';

export const HotPrices = () => {
  const title = 'Hot prices';

  const filteredProducts = products
    .filter(product => product.fullPrice - product.price > 80)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <section className={styles.hotPrices}>
      <ProductSlider products={filteredProducts} title={title} />
    </section>
  );
};
