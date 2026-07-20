import { Link } from 'react-router-dom';

import styles from './Tablets.module.scss';

export const Tablets = () => (
  <div className="container">
    <Link to="/" className={styles.home}>
      <button className={styles.homeButton}>
        <img src="/img/home.svg" alt="home" className={styles.homeImg} />
        <span className={styles.homeGo}>{'>'}</span>
        <span className={styles.homeGoTo}>Tablets</span>
      </button>
    </Link>
    <h1 className="title">Tablets</h1>
  </div>
);
