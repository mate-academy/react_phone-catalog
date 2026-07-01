import { Link } from 'react-router-dom';

import styles from './Favorites.module.scss';

export const Favorites = () => (
  <section className="container">
    <Link to="/" className={styles.home}>
      <button className={styles.homeButton}>
        <img src="/img/home.svg" alt="home" className={styles.homeImg} />
        <span className={styles.homeGo}>{'>'}</span>
        <span className={styles.homeGoTo}>Favorites</span>
      </button>
    </Link>
    <h1 className="title">Favorites</h1>
  </section>
);
