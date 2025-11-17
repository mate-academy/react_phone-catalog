import { NavLink, Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import figmaLogo from '../../../public/img/Icons/Logo.svg';
// eslint-disable-next-line max-len
import toTop from '../../../public/img/Icons/arrow-top-Icon.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.logo}>
        <img src={figmaLogo} alt="NiceGadgets logo" />
      </Link>

      <nav className={styles.nav}>
        <a
          target="_blank"
          href="https://github.com/Moddderi"
          className={styles.link}
          rel="noreferrer"
        >
          Github
        </a>
        <NavLink to="/" className={styles.link}>
          HOME
        </NavLink>

        <NavLink to="/" className={styles.link}>
          PHONES
        </NavLink>
      </nav>

      <a href="#" className={styles.toTop}>
        <p className={styles.p}>Back to top</p>
        <img src={toTop} alt="toTopIcon" />
      </a>
    </footer>
  );
};
