import { ProductSlider } from '../ProductSlider/ProductSlider';
import { BrandNewModels } from '../BrandNewModels/BrandNewModels';
import styles from './Main.module.scss';

export const Main = () => {
  return (
    <main className={styles.main}>
      <ProductSlider />;
      <BrandNewModels />;
    </main>
  );
};
