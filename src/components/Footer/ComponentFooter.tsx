import React from 'react';
import styles from './ComponentFooter.module.scss';

export const ComponentFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer>
      <div className={styles.container}>
        <a href="#" className={styles.container__logo}>
          <img src="../../public/img/Logo.png" alt="NICE GADGETS" />
        </a>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <a href="/Github" className={styles.nav__link}>
                Github
              </a>
            </li>
            <li className={styles.nav__item}>
              <a href="/Contacts" className={styles.nav__link}>
                Contacts
              </a>
            </li>
            <li className={styles.nav__item}>
              <a href="/Rights" className={styles.nav__link}>
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.container__button}>
          <a className={styles.back} onClick={scrollToTop}>
            Back to top
          </a>
          <button className={styles.button} onClick={scrollToTop}>
            ^
          </button>
        </div>
      </div>
    </footer>
  );
};
