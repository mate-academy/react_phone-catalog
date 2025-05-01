/* eslint-disable max-len */

import React from 'react';
import styles from './Home.module.scss';
import { Header } from '../../components/Header';
import { ProductCarouselSection } from '../../components/ProductCarouselSection';
import { ProductCategorySection } from '../../components/ProductCategorySection';

export const Home = () => {
  return (
    <section className="section home-page">
      <Header />
      <div className="container">
        <div className={styles['home-page__title-wrapper']}></div>
        <h1>Welcome to Nice Gadgets store!</h1>
        {/* <div className={styles['home-page__slider']}></div> */}
      </div>
      <ProductCarouselSection sectionTitle={'Brand new models'} />
      <ProductCategorySection />
      <ProductCarouselSection sectionTitle={'Hot prices'} />
    </section>
  );
};
