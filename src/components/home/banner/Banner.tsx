import { FC } from 'react';

import { Slider } from './slider/Slider';

import styles from './banner.module.scss';

export const Banner: FC = () => {
  return (
    <section className={styles.banner}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <h2>Welcome to Nice Gadgets store!</h2>
      <Slider />
    </section>
  );
};
