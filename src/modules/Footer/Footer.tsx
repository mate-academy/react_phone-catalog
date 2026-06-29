import styles from './Footer.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../shared/Icon';
import ThemeSwitcher from '../shared/ThemeSwitcher';
import Logo from '../shared/Logo';
import LangSelect from '../shared/LandSelect/LangSelect';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <div className={styles.footer__left}>
            <NavLink className={styles.footer__logo} to="/">
              <Logo />
            </NavLink>
          </div>
          <div className={styles.footer__menu}>
            <Link className={styles.footer__link} to="#">
              Github
            </Link>
            <Link className={styles.footer__link} to="#">
              Contacts
            </Link>
            <Link className={styles.footer__link} to="#">
              Rights
            </Link>
            <LangSelect />
            <ThemeSwitcher />
          </div>
          <div className={styles.footer__right}>
            <a>Back to top</a>
            <Icon
              onClick={scrollToTop}
              iconStyles={{
                icon: 'type_slider',
                image: ['arrowRight', 'rotate_90'],
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
