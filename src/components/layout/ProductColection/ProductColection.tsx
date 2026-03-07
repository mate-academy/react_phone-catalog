import { ButtonArrow } from '../../ui/ButtonArrow';
import { SectionTitle } from '../../ui/SectionTitle';
import { ProductCard } from '../ProductCard';
import styles from './ProductColection.module.scss';

export const ProductColection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.section__header}>
        <SectionTitle>Brand new models</SectionTitle>
        <div className={styles.section__arrows}>
          <ButtonArrow disabled={true} direction="left" />
          <ButtonArrow direction="right" />
        </div>
      </div>
      <div className={styles.content}>
        <ProductCard />
      </div>
    </section>
  );
};
