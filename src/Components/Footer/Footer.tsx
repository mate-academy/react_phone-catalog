import styles from './Footer.module.scss';
import { logo, arrowUp } from '../../icons';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.container}>
      <NavLink to="/" aria-label="Go to home">
        <img src={logo} alt="nice-gadgets-main-logo" className={styles.logo} />
      </NavLink>
      <div className={styles.linksContainer}>
        <a
          href="https://github.com/mate-academy/react_phone-catalog/pull/597"
          className={styles.links}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="https://pl.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.links}
        >
          Contacts
        </a>
        <a className={styles.links}>Rights</a>
      </div>
      <div className={styles.returnContainer}>
        <p className={styles.return}>Back to top</p>
        <button className={styles.returnButton} onClick={scrollToTop}>
          <img src={arrowUp} alt="arrow-up-icon" />
        </button>
      </div>
    </div>
  );
};
