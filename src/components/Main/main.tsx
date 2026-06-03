import styles from './main.module.scss';
import { BannerSlider } from '../../inMain/BannerSlider/BannerSlider';

export const Main = () => {
  return (
    <main>
      <div className={styles.main}> </div>
      <BannerSlider />
    </main>
  );
};
