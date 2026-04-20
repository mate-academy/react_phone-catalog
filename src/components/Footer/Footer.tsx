import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollTo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoFooter}>
          <Link to="/">
            <img src="/img/icons/logoFooter.svg" alt="" />
          </Link>
        </div>

        <div className={styles.navi}>
          <Link to="/">github </Link>
          <Link to="/">contacts</Link>
          <Link to="/">rights</Link>
        </div>

        <div className={styles.buttonTop}>
          <span className={styles.text}>Back to top</span>
          <button className={styles.but_foot} onClick={scrollTo}>
            <img src="/img/icons/whitetopbut.svg" alt="topBut" />
          </button>
        </div>
      </div>
    </footer>
  );
};
