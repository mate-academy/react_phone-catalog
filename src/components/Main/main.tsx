import styles from './Main.module.scss';
import { BannerSlider } from '../../Functional/BannerSlider/BannerSlider';
// eslint-disable-next-line max-len
import { BrandNewModels } from '../../Functional/BrandNewModels';

export const Main: React.FC = () => {
  return (
    <main>
      <div className={styles.main}>
        <h1 className={styles.mainWellcome}>Welcome to Nice Gadgets store!</h1>
      </div>
      <BannerSlider />
      <BrandNewModels />
    </main>
  );
};
