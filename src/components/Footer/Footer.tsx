import React from "react";
import style from './Footer.module.scss';
import logoIcon from '/img/Logo.svg';

export const Footer: React.FC = () => {
  // Функція для прокрутки сторінки вгору
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={style.footer_wrapper}>
      <div className="container">
        <div className={style.footer}>
          <img src={logoIcon} alt="logo" className={style.logo} />
          <div className={style.links}>
            <a href="#" className={style.link}>
              Github
            </a>
            <a href="/contacts" className={style.link}>Contacts</a>
            <a href="/rights" className={style.link}>Rights</a>
          </div>
          <div className={style.button_wrapper}>
            <p className={style.button_text}>Back to top</p>
            <button
              className={style.button}
              onClick={scrollToTop}
              aria-label="Back to top"
            >
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
