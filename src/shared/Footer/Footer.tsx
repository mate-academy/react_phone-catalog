import React from 'react';
import styles from './Footer.module.scss';

export const Footer = () => {
  const backToTop = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__inner}>
          <a className={styles.footer__logo} href="/">
            <img src="icons/logo.svg" alt="Logotype" />
          </a>

          <ul className={styles.footer__list}>
            <li className={styles.footer__listItem}>
              <a
                className={styles.footer__listLink}
                href="https://github.com/10hokageee"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className={styles.footer__listItem}>
              <a
                className={styles.footer__listLink}
                target="_blank"
                href="https://web.telegram.org/k/#@integrahells1n"
                rel="noreferrer"
              >
                Contacts
              </a>
            </li>
            <li className={styles.footer__listItem}>
              <a className={styles.footer__listLink} href="">
                rights
              </a>
            </li>
          </ul>

          <a className={styles.footer__goHome} onClick={backToTop}>
            Back to top
            <img
              className={styles.footer__arrow}
              src="icons/arrow-top.svg"
              alt="To top arrow"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
