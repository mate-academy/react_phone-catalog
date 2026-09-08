import { ProductSlider } from '../ProductSlider';
import styles from './HotPrices.module.scss';

export const HotPrices = () => {
  return (
    <section className={styles['hot-prices']}>
      <div className="container">
        <h2 className="title">Hot prices</h2>
        <ProductSlider detailProduct={undefined} />
      </div>
    </section>
  );
};
