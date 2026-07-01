import { TypesOfProducts } from '../../types/TypesOfProducts';
import styles from './AboutProduct.module.scss';

type Props = {
  product: TypesOfProducts;
};

export const AboutProduct = ({ product }: Props) => {
  return (
    <div className={styles.about}>
      <div className={styles.about__top}>
        <span className={styles.about__topTitle}>About</span>

        <div className={styles.about__topDivider}></div>
      </div>

      {product.description.map(descriotion => (
        <div key={descriotion.title} className={styles.about__descriotion}>
          <span className={styles.about__descriotionTitle}>
            {descriotion.title}
          </span>

          <span className={styles.about__descriotionText}>
            {descriotion.text}
          </span>
        </div>
      ))}
    </div>
  );
};
