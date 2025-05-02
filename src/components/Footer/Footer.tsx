/* eslint-disable max-len */
import React from 'react';
import logo from '../../img/main-logo.svg';

import styles from './Footer.module.scss';
import { ButtonScrollToTop } from '../UI/ButtonScrollToTop';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <a href="#">
            <img src={logo} alt="Logo" />
          </a>
          <div className="footer__links">
            <ul className={styles['footer__links-list']}>
              <li>
                <a className="uppercase-text main-text--secondary" href="#">
                  GITHUB
                </a>
              </li>
              <li>
                <a className="uppercase-text main-text--secondary" href="#">
                  CONTACTS
                </a>
              </li>
              <li>
                <a className="uppercase-text main-text--secondary" href="#">
                  RIGHTS
                </a>
              </li>
            </ul>
          </div>
          <ButtonScrollToTop label="Back to top" />
        </div>
      </div>
    </footer>
  );
};
