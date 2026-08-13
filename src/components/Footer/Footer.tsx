import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { translations } from '../../locales';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const { theme, language } = useApp();

  /*Скрол для кнопки на верх*/

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      {/* Блок для розміщення лінків*/}
      <div className={styles.container}>
        {/* Лого*/}
        <Link to="/" className={styles.logo}>
          <img
            src={theme === 'dark' ? 'logo.dark.svg' : 'logo.svg'}
            alt="Nice Gadgets Logo"
          />
        </Link>

        <nav className={styles.nav}>
          {/*П-ння на гіт */}
          <a
            href="https://github.com/24O07/react_phone-catalog"
            className={styles.link}
            target="_blank "
            rel="noopener noreferrer"
          >
            {translations.footer.github[language]}
          </a>
          {/* Лінк контактів*/}
          <Link to="/contacts" className={styles.link}>
            {translations.footer.contacts[language]}
          </Link>
          {/* Спан правил*/}
          <span className={styles.rights}>
            {translations.footer.rights[language]}
          </span>
        </nav>

        {/* Кнопка для повернення на верх*/}
        <div className={styles.backToTop} onClick={scrollTop}>
          <span className={styles.backToTopText}>
            {translations.footer.backToTop[language]}
          </span>
          <button type="button" className={styles.arrowBtn}>
            <img
              src={theme === 'dark' ? 'arrow-up-dark.svg' : 'arrow-up.svg'}
              alt="Back to top"
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
