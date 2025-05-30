/* eslint-disable max-len */
import React from 'react';
import logo from '../../img/logo.png';

import { ButtonScrollToTop } from '../UI/ButtonScrollToTop';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <Link to={'/'}>
            <img className="main-logo" src={logo} alt="Logo" />
          </Link>
          <div className="footer__links">
            <ul className={styles['footer__links-list']}>
              <li>
                <a
                  className="uppercase-text main-text--secondary"
                  rel="noreferrer"
                  href="https://github.com/VadimKudrenko"
                  target="_blank"
                >
                  GITHUB
                </a>
              </li>
              <li>
                <a
                  className="uppercase-text main-text--secondary"
                  rel="noreferrer"
                  href="https://github.com/VadimKudrenko"
                  target="_blank"
                >
                  CONTACTS
                </a>
              </li>
              <li>
                <a
                  className="uppercase-text main-text--secondary"
                  rel="noreferrer"
                  href="https://github.com/VadimKudrenko"
                  target="_blank"
                >
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
