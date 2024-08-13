import classNames from 'classnames';
import styles from './Footer.module.scss';
import { Icon } from '../ui/Icon';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.footer__content}>
          <Link to="/" className={styles.footer__link}>
            <img
              src="./img/icons/logo.svg"
              className={classNames('logo', styles.footer__icon)}
              alt="logo"
            />
          </Link>

          <nav className={classNames(styles.nav, styles.footer__nav)}>
            <ul
              className={classNames(
                styles.nav__list,
                styles['footer__nav-list'],
              )}
            >
              <li className={styles['footer__nav-item']}>
                <a
                  href="https://github.com/SrTrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav__link uppercase-text"
                >
                  Github
                </a>
              </li>
              <li className={styles['footer__nav-item']}>
                <a
                  href="https://external-site.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav__link uppercase-text"
                >
                  Contacts
                </a>
              </li>
              <li className={styles['footer__nav-item']}>
                <a
                  href="https://external-site.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav__link uppercase-text"
                >
                  Rights
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.footer__buttons}>
            <p className="small-text">Back to top</p>
            <a href="#header" className={classNames(styles.footer__btn)}>
              <Icon iconName="up" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
