import React from 'react';
import classNames from 'classnames';

import { heroSliderItems } from '../../constants';
import { PicturesSlider } from '../PicturesSlider';

import styles from './HeroSection.module.scss';

type Props = {
  className?: string;
};

export const HeroSection: React.FC<Props> = ({ className = '' }) => {
  return (
    <section className={classNames(styles.hero, className)}>
      <h1 className={styles.hero__title}>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider
        className={styles.hero__slider}
        slides={heroSliderItems}
      />
    </section>
  );
};
