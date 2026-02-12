import React from 'react';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => (
  <section className={styles.homePage}>
    <h2>Welcome to Gadget Catalog</h2>
    <p>Browse the collection of phones, tablets and accessories.</p>
  </section>
);

export default HomePage;
