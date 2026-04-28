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

        <div className={s.footerCenter}>
        <Link to="/github">Github</Link>
        <Link to="/contacts">Contacts</Link>
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
