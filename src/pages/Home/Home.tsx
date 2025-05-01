import React from 'react';
import styles from './Home.module.scss';
import { Header } from '../../components/Header';
import { ProductCarousel } from '../../components/ProductCarousel';

export const Home = () => {
  return (
    <section className="section home-page">
      <Header />
      <div className="container">
        <div className={styles['home-page__title-wrapper']}></div>
        <h1>Welcome to Nice Gadgets store!</h1>
        {/* <div className={styles['home-page__slider']}></div> */}
      </div>
      <ProductCarousel title={'Brand new models'} />
    </section>
  );
};
