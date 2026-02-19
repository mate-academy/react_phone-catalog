import styles from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard';

interface Product {
  id: number;
  category: string;
  itemId: string;
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
}

interface Props {
  title: string;
  products: Product[];
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
      {products.map(product => (
        <div key={product.id} className={styles.item}>
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  </section>
);
