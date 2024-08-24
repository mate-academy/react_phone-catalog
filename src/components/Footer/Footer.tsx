import classNames from 'classnames';
import styles from './Footer.module.scss';
import { Icon } from '../ui/Icon';
import { Link } from 'react-router-dom';
import { RefObject } from 'react';

type FooterProps = {
  headerRef?: RefObject<HTMLDivElement>;
};

export const Footer: React.FC<FooterProps> = ({ headerRef }) => {
  const scrollToTop = () => {
    if (headerRef && headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.footer__content}>
          <Link to="/" className={styles.footer__link} onClick={scrollToTop}>
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
                  href="https://github.com/SrTrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav__link uppercase-text"
                >
                  Contacts
                </a>
              </li>
              <li className={styles['footer__nav-item']}>
                <a
                  href="https://github.com/SrTrace"
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
            <button
              onClick={scrollToTop}
              className={classNames(styles.footer__btn)}
            >
              <Icon iconName="up" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
