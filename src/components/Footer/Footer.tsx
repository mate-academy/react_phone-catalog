import React from 'react';
import footer from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={footer.footer}>
      <div className={footer.footer__container}>
        <Link to="/" className={footer.footer__logo}>
          <img
            src="img/icons/Logo-main.png"
            alt="Nice Gadgets logo"
            className={footer.footer__logo__image}
          />
        </Link>
        <ul className={footer.footer__list}>
          <li className={footer.footer__item}>
            <Link
              to="https://github.com/mykytalandar"
              className={footer.footer__link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Link>
          </li>
          <li className={footer.footer__item}>
            <Link
              to="https://github.com/mykytalandar"
              className={footer.footer__link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contacts
            </Link>
          </li>
          <li className={footer.footer__item}>
            <Link
              to="https://github.com/mykytalandar"
              className={footer.footer__link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Rights
            </Link>
          </li>
        </ul>
        <div className={footer['back-to-top-button-wpapper']}>
          <button
            className={footer['back-to-top-button']}
            onClick={scrollToTop}
          >
            <span className={footer['button-text']}>Back to top</span>
            <i className={footer['arrow-top']}></i>
          </button>
        </div>
      </div>
    </footer>
  );
};
