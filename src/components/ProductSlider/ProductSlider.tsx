import styles from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { BaseProduct } from '../../types';

interface Props {
  title: string;
  products: BaseProduct[];
}

export const ProductSlider = ({ title, products }: Props) => (
  <section className={styles.slider}>
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.arrows}>
        <button type="button" className={styles.arrow} aria-label="Scroll left">
          <i className="fas fa-chevron-left" />
        </button>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Scroll right"
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>
    </div>

    <div className={styles.list}>
      {products.map((product: BaseProduct) => (
        <div key={product.id} className={styles.item}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  </section>
);
