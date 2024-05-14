import React from 'react';
import styles from './footer.module.scss';
import catalogLogo from './Pictures/header-logo.png';
import catalogLogoDark from './Pictures/lodoDark.png';
import sliderButton from './Pictures/sliderButton.png';
import sliderButtonDark from './Pictures/sliderButtonDark.png';
import { useAppSelector } from '../../Hooks/hooks';
import { Theme } from '../../Helpers/theme';

export const Footer: React.FC = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return (
    <section className={styles.footerSection}>
      <footer
        className={theme === Theme.light ? styles.footer : styles.footerDark}
      >
        <img
          className={styles.footerLogo}
          src={theme === Theme.light ? catalogLogo : catalogLogoDark}
          alt="Catalog Logo"
        />
        <ul className={styles.footerList}>
          <li className={styles.footerItems}>
            <a
              href="https://github.com/Ihor-Prodan"
              target="_blank"
              className={
                theme === Theme.light
                  ? styles.footerLink
                  : styles.footerLinkDark
              }
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className={styles.footerItems}>
            {' '}
            <a
              href="#"
              className={
                theme === Theme.light
                  ? styles.footerLink
                  : styles.footerLinkDark
              }
            >
              Contacts
            </a>
          </li>
          <li className={styles.footerItems}>
            {' '}
            <a
              href="#"
              className={
                theme === Theme.light
                  ? styles.footerLink
                  : styles.footerLinkDark
              }
            >
              Rights
            </a>
          </li>
        </ul>
        <div className={styles.toTopContainer}>
          <a className={styles.topButtonLink} href="#">
            <button
              className={
                theme === Theme.light
                  ? styles.footerButton
                  : styles.footerButtonDark
              }
            >
              <img
                className={styles.buttonIcon}
                src={theme === Theme.light ? sliderButton : sliderButtonDark}
                alt="Catalog Logo"
              ></img>
            </button>
          </a>
        </div>
      </footer>
    </section>
  );
};
