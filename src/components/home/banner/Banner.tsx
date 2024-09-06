import { FC } from 'react';

import styles from './banner.module.scss';

import { Slider } from './slider/Slider';

export const Banner: FC = () => {
  return (
    <section className={styles.banner}>
      <h1>Welcome to Nice Gadgets store!</h1>
      <Slider />
    </section>
  );
};
