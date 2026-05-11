import styles from './BrandNewModelsmodule.scss';
import { BannerSlider } from '../BannerSlider/BannerSlider';

export const BrandNewModelsSlider = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.toNiceGadgets}>
          <h1>Welcome to Nice Gadgets store!</h1>
          <BannerSlider />
        </div>
      </div>
    </main>
  );
};
