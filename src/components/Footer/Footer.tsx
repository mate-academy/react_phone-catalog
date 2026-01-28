import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

import logo from '/img/logo.png';
import arrowUp from '/img/arrow-black.svg?url';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className={styles.footer}>
      <img src={logo} className={styles.logo} alt="logo"></img>

      <div className={styles.links}>
        <Link
          to="https://github.com/alyonashunevych/react_phone-catalog"
          className={styles.link}
        >
          GitHub
        </Link>

        <Link
          to="https://github.com/alyonashunevych/react_phone-catalog"
          className={styles.link}
        >
          Contacts
        </Link>

        <Link
          to="https://github.com/alyonashunevych/react_phone-catalog"
          className={styles.link}
        >
          Rights
        </Link>
      </div>

      <div className={styles.button_box}>
        <p className={styles.button_text}>Back to top</p>

        <button className={styles.button_up} onClick={handleScrollToTop}>
          <img
            src={arrowUp}
            alt="arrow icon"
            style={{ transform: 'rotate(-90deg)' }}
          ></img>
        </button>
      </div>
    </footer>
  );
};
