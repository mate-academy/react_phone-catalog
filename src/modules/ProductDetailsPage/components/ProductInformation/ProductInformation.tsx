import { About } from '../About';
import { TechSpecs } from '../TechSpecs';
import styles from './ProductInformation.module.scss';

export const ProductInformation = () => {
  return (
    <div className={styles.product__information}>
      <About />

      <TechSpecs />
    </div>
  );
};
