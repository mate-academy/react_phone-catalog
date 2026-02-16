import React from 'react';
import style from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={style.footer}>
      <img
        className={style.footer_logo}
        src="img/icons/Logo.svg"
        alt="logo img"
      />

      <div className={style.footer_container}>
        <nav className={style.footer_nav}>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/DSemeniukV/react_phone-catalog"
            className={`${style.footer_link} ${style['footer_link--home']}`}
          >
            GITHUB
          </a>
          <a href="#" className={style.footer_link} target="_blank">
            CONTACTS
          </a>
          <a href="#" className={style.footer_link} target="_blank">
            RIGHTS
          </a>
        </nav>
      </div>

      <div className={style.footer_btn}>
        <p className={style['footer_btn--text']}>Back to top</p>
        <button
          className={style['footer_btn--back-to-top']}
          onClick={scrollToTop}
        >
          <img
            className={style['footer_btn--arrow-up']}
            src="img/icons/Chevron (Arrow Up).svg"
            alt="arrow up"
          />
        </button>
      </div>
    </footer>
  );
};
