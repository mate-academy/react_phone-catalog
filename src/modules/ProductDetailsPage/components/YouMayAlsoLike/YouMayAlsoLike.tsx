import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import styles from './YouMayAlsoLike.module.scss';

interface YouMayAlsoLikeProps {
  products: Array<{
    id: number;
    category: 'phones' | 'tablets' | 'accessories';
    itemId: string;
    name: string;
    fullPrice: number;
    price: number;
    screen: string;
    capacity: string;
    color: string;
    ram: string;
    year: number;
    image: string;
  }>;
}

export function YouMayAlsoLike({
  products,
}: YouMayAlsoLikeProps): JSX.Element | null {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="you-may-also-like-heading"
    >
      <h2 id="you-may-also-like-heading" className={styles.heading}>
        You may also like
      </h2>
      <ProductsSlider title="" products={products} />
    </section>
  );
}
