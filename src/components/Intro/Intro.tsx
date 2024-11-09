import React from 'react';
import { images } from '../../assets/images';
import { BannerSlider } from '../BannerSLider';
import { Container } from '../Container';
import styles from './Intro.module.scss';

export const Intro: React.FC = () => {
  return (
    <section className={styles.intro}>
      <div className={styles.introContent}>
        <Container>
          <h1 className={styles.introTitle}>Welcome to Nice Gadgets store!</h1>
        </Container>

        <BannerSlider images={images} />
      </div>
    </section>
  );
};
