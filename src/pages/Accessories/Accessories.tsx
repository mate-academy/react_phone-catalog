import { Link } from 'react-router-dom';

import styles from './Accessories.module.scss';

export const Accessories = () => (
  <div className="container">
    <Link to="/" className={styles.home}>
      <button className={styles.homeButton}>
        <img src="/img/home.svg" alt="home" className={styles.homeImg} />
        <span className={styles.homeGo}>{'>'}</span>
        <span className={styles.homeGoTo}>Accessories</span>
      </button>
    </Link>
    <h1 className="title">Acccessories</h1>
  </div>
);
