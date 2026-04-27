import React from 'react';
import s from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={s.footer}>
      <div className={s.footerContainer}>
        <div className={s.footerLeft}>
          <img src="./img/Logo.svg" alt="Logo" className={s.footerLogo} />
        </div>

        <div className={s.footerCenter}>
          <a href="/github">Github</a>
          <a href="/contacts">Contacts</a>
          <a href="/rights">Rights</a>
        </div>

        <div className={s.footerRight}>
          <div className={s.backToTopText}>Back to top</div>
          <button
            className={s.backToTopButton}
            onClick={scrollToTop}
          >
            <img src="./img/Arrow_Top.svg" alt="Arrow up" />
          </button>
        </div>
      </div>
    </footer>
  );
}

