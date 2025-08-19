import React from 'react';
import footer from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={footer.footer}>
      <a href="/" className={footer.footer__logo}>
        <img src="/img/icons/logo.png" alt="Nice Gadgets logo" />
      </a>
      <ul className={footer.footer__list}>
        <li className={footer.footer__item}>
          <a href="" className={footer.footer__link}>
            Github
          </a>
        </li>
        <li className={footer.footer__item}>
          <a href="" className={footer.footer__link}>
            Contacts
          </a>
        </li>
        <li className={footer.footer__item}>
          <a href="" className={footer.footer__link}>
            Rights
          </a>
        </li>
      </ul>
      <div className={footer['back-to-top-button-wpapper']}>
        <button className={footer['back-to-top-button']} onClick={scrollToTop}>
          <span className={footer['button-text']}>Back to top</span>
          <i className={footer['arrow-top']}></i>
        </button>
      </div>
    </footer>
  );
};
