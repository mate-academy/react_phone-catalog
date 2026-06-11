import { useEffect, useState } from 'react';

import styles from './header.module.scss';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useMatchMedia } from '../../hooks/useMatchMedia';
import { NavLink } from 'react-router-dom';
import IconsAction from '../IconActions/IconActions';

export const Header = () => {
  const HEADERS_ITEMS = [
    { label: 'HOME', href: '/' },
    { label: 'PHONES', href: '/phones' },
    { label: 'TABLETS', href: '/tablets' },
    { label: 'ACCESSORIES', href: '/accessories' },
  ];

  const isMobile = useMatchMedia('(max-width: 639px)');

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen, isMobile]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <a href="/">
            <img src="./img/Logo.svg" alt="logo" className={styles.logo} />
          </a>
          <div className={styles['header-middle-block-wrapper']}>
            <ul className={styles['header-list']}>
              {HEADERS_ITEMS.map(item => {
                return (
                  <li className={styles['header-item']} key={item.label}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.headerLink} ${styles.active}`
                          : `${styles.headerLink}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles['buttons-right']}>
            <div className={styles.actions}>
              <IconsAction variant="header" />
            </div>
            <button
              type="button"
              className={styles.burgerMenu}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <img
                src={
                  isMenuOpen ? './img/icons/Close.svg' : './img/icons/Union.svg'
                }
                alt={isMenuOpen ? 'close Menu' : 'open Menu'}
                className={styles.burgerMenu__icon}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        items={HEADERS_ITEMS}
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
        }}
      />
    </>
  );
};

export default Header;
