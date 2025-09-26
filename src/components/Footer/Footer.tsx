import styles from './Footer.module.scss';
import { useContext } from 'react';
import logo from '../../assets/icons/logo.svg';
import logoLight from '../../assets/icons/logoLight.svg';
import { ThemeContext } from '../Themes/Themes';
import { NavLink } from 'react-router-dom';
import arrowUp from '../../assets/icons/arrowUpL.svg';
import arrowUpLight from '../../assets/icons/arrowUpLight.svg';

export const Footer = () => {
  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { theme } = useContext(ThemeContext);

  const isBasicDark = theme === 'dark';

  return (
    <footer className={styles.footer}>
      <nav role="">
        <div className={styles.footer__container}>
          <NavLink className={styles.footer__logo} to="/">
            <img src={isBasicDark ? logo : logoLight} alt="logo" />
          </NavLink>
          <ul className={styles['footer-links']}>
            <NavLink
              className={styles['footer-item']}
              to="https://github.com/kifont"
              target="_blank"
            >
              Github
            </NavLink>

            <NavLink
              className={styles['footer-item']}
              to="https://www.linkedin.com/in/anton-kryzhanivskyi-938a462a8/"
              target="_blank"
            >
              Contacts
            </NavLink>

            <NavLink className={styles['footer-item']} to="/" target="_blank">
              Rights
            </NavLink>
          </ul>
          <div className={styles.footer__button}>
            <h3 className={styles.footer__buttonsName}>Back to top</h3>
            <button className={styles.footer__btn} onClick={scrollTop}>
              <img
                src={isBasicDark ? arrowUp : arrowUpLight}
                alt="Scroll to top"
              />
            </button>
          </div>
        </div>
      </nav>
    </footer>
  );
};
