import React from "react";
import styles from './Footer.module.scss';
import Logo from './icons/Logo.png';
import Button from './icons/button.png';
import { NavLink } from "react-router-dom";

const handleScroll = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <NavLink to="/">
            <img src={Logo} alt="Logo" className={styles.footer__logo__img} />
          </NavLink>
        </div>

        <nav className={styles.footer__nav}>
          <div className={styles.footer__nav__container}>
            <NavLink to="/github" className={styles.footer__nav__item}>
              GITHUB
            </NavLink>

            <NavLink to="/contacts" className={styles.footer__nav__item}>
              CONTACTS
            </NavLink>

            <NavLink to="/rights" className={styles.footer__nav__item}>
              RIGHTS
            </NavLink>
          </div>
        </nav>

        <div className={styles.footer__button}>
          <button
            className={styles.footer__button__text}
            onClick={handleScroll}
          >
            Back to top
            <img src={Button} alt="Back to top" className={styles.footer__button__img} />
          </button>
        </div>
      </div>
    </footer>
  )
}
