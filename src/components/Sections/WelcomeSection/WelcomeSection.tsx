import type { FC } from 'react';
import styles from './WelcomeSection.module.scss';
import { HeroSlider } from '../../Sliders/HeroSlider/HeroSlider';

export const WelcomeSection: FC = () => {
  return (
    <section className={styles.box}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <HeroSlider />
    </section>
  );
};
