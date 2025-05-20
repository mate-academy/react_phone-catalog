/* eslint-disable max-len */
import React from 'react';
import styles from './Footer.module.scss';

import logo from '../../../public/img/logo.png';
import arrowUp from '../../../public/img/assets/icons/sliderButtonDefaultRight.png';

import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <img src={logo} alt="Logo image" />
        </div>

        <ul className={styles.footer__links}>
          <li>
            <Link to="/github">Github</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
          <li>
            <Link to="/rights">Rights</Link>
          </li>
        </ul>

        <div className={styles.footer__backToTop}>
          <span>Back to top</span>
          <button className={styles.footer__backBtn}>
            <img
              src={arrowUp}
              alt="Arrow up icon"
              className={styles.footer__icon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
