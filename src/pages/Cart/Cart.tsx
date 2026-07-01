import { Link } from 'react-router-dom';

import styles from './Cart.module.scss';

export const Cart = () => (
  <section className="container">
    <Link to="/" className={styles.home}>
      <button className={styles.homeButton}>
        <img src="/img/home.svg" alt="home" className={styles.homeImg} />
        <span className={styles.homeGo}>{'>'}</span>
        <span className={styles.homeGoTo}>Cart</span>
      </button>
    </Link>
    <h1 className="title">Cart</h1>
  </section>
);
