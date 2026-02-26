import React from 'react';
import styles from './footer.module.scss';
import logo from '../../../assets/images/Logo-header.png';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={classNames(styles.footer)}>
      <div className={classNames(styles.footer_container, 'container')}>
        <nav aria-label="Footer navigation">
          <ul className={styles.footer_list}>
            <li>
              <a href="/">
                <img src={logo} alt="logo" className={styles.footer_img} />
              </a>
            </li>
            <li className={styles.footer_github}>
              <a
                href="https://github.com/vanvalera"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer_link}
              >
                GITHUB
              </a>
            </li>
            <li className={styles.footer_contact}>
              <a
                href="https://www.linkedin.com/in/valeriy-zhyla/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer_link}
              >
                CONTACTS
              </a>
            </li>
            <li className={styles.footer_rights}>
              <a
                href="https://github.com/vanvalera"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer_link}
              >
                RIGHTS
              </a>
            </li>
            <li className={styles.footer_backtop}>
              <p className={styles.footer_text}>Back to top</p>
              <p
                className={styles.footer_backtop_link}
                onClick={scrollToTop}
                style={{ cursor: 'pointer' }}
              ></p>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
