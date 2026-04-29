import React from 'react';
import { Link } from 'react-router-dom';
import s from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={s.footer}>
      <div className={s.footerContainer}>
        <div className={s.footerLeft}>
          <Link to="/">
            <img src="./img/Logo.svg" alt="Logo" className={s.footerLogo} />
          </Link>
        </div>

        {/* ПРИБРАВ ДУБЛЬ ТУТ */}
        <div className={s.footerCenter}>
          <a
            href="https://github.com/wolfymmm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/yanamarusina"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </a>
          <Link to="/rights">Rights</Link>
        </div>

        <div className={s.footerRight}>
          <div className={s.backToTopText}>Back to top</div>
          <button
            type="button"
            className={s.backToTopButton}
            onClick={scrollToTop}
          >
            <img src="./img/Arrow_Top.svg" alt="Arrow up" />
          </button>
        </div>
      </div> 
    </footer>
  );
};
