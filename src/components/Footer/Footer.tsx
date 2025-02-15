import React from 'react';
import styles from './Footer.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Footer = ({ headerRef }) => {
  const handleBackToTop = (event: React.MouseEvent) => {
    event.preventDefault();
    headerRef.current?.scrollIntoView({ behaviour: 'smooth' });
  };

  return (
    <>
      <footer className={styles.footer}>
        <NavLink to="/" className={styles.logo}></NavLink>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <a
                className={styles.nav__link}
                href="https://github.com/NazarHaida"
              >
                Github
              </a>
            </li>
            <li className={styles.nav__item}>
              <a
                className={styles.nav__link}
                href="https://github.com/NazarHaida"
              >
                Contacts
              </a>
            </li>
            <li className={styles.nav__item}>
              <a
                className={styles.nav__link}
                href="https://github.com/NazarHaida"
              >
                rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <p className="back-title">Back to top</p>
          <a
            href=" "
            onClick={handleBackToTop}
            className={classNames(
              styles['back-button'],
              styles.button,
              styles.button,
            )}
          >
            <img
              src="Images/Arrow-right.svg"
              alt="Go Back"
              className={classNames(styles['back-image'])}
            />
          </a>
        </div>
      </footer>
    </>
  );
};
