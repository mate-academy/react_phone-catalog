import React from 'react';

import styles from './HomePage.module.scss';

import { HomeHeroSection } from '../HomeHeroSection';
import { HomeSectionFirst } from '../HomeSectionFirst';
import { HomeSectionSecond } from '../HomeSectionSecond';
import { HomeSectionThird } from '../HomeSectionThird';

export const HomePage: React.FC = () => {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.heroContainer}>
          <HomeHeroSection />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionContainerFirst}>
          <HomeSectionFirst />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionContainerSecond}>
          <HomeSectionSecond />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionContainerThird}>
          <HomeSectionThird />
        </div>
      </section>
    </>
  );
};
