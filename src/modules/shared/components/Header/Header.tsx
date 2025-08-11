import React, { useState } from 'react';
import styles from './Header.module.scss';
import '@/styles/icon.scss';
import '@/styles/typography.scss';
import classNames from 'classnames';

import { Menu } from '../Menu';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles.header__logo}>
            <img
              src="/img/icons/Logo@2x.png"
              alt="Nice gadgets"
              className={styles['header__logo--img']}
            />
          </div>

          <nav className={styles.header__nav}>
            <ul className={styles['header__nav--list']}>
              <li>
                <a
                  className={classNames(
                    styles['header__nav--link'],
                    'text__uppercase',
                  )}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className={classNames(
                    styles['header__nav--link'],
                    'text__uppercase',
                  )}
                >
                  Phones
                </a>
              </li>
              <li>
                <a
                  className={classNames(
                    styles['header__nav--link'],
                    'text__uppercase',
                  )}
                >
                  Tablets
                </a>
              </li>
              <li>
                <a
                  className={classNames(
                    styles['header__nav--link'],
                    'text__uppercase',
                  )}
                >
                  Accessories
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.header__icons}>
          <div className={styles['header__icons--mobile']}>
            <div
              className={styles['header__icons--menu']}
              onClick={() => handleMenuToggle()}
            >
              {mobileMenuOpen ? (
                <i className="icon icon--close"></i>
              ) : (
                <i className="icon icon--menu"></i>
              )}
            </div>
          </div>
          <div className={styles['header__icons--desktop']}>
            <a href="#" className="icon icon--heart"></a>
          </div>
          <div className={styles['header__icons--desktop']}>
            <a href="#" className="icon icon--cart"></a>
          </div>
        </div>
      </div>

      <Menu isOpen={mobileMenuOpen} onClose={handleMenuClose} />
    </div>
  );
};
