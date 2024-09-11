import { FC } from 'react';
import { PictureSlider } from './components/PictureSlider';
import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </div>
      <PictureSlider />
    </div>
  );
};
