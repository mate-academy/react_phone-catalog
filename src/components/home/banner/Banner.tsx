import { FC } from 'react';

import styles from './banner.module.scss';

import { Slider } from './slider/Slider';

export const Banner: FC = () => {
  return (
    <section className={styles.banner}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <h2>Welcome to Nice Gadgets store!</h2>
      <Slider />
    </section>
  );
};
