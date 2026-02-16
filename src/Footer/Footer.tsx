import React from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.scss';

export const Footer: React.FC = () => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className={style.footer}>
        <div className={style.footer__container}>
          <Link to="/">
            <img src="img/Logo.png" alt="Logo" className={style.logo} />
          </Link>
          <div className={style.footer__menu}>
            <ul className={style.footer__menu__list}>
              <li className={style.footer__menu__item}>
                <Link
                  to="https://github.com/ogchy"
                  target="_blank"
                  rel="noopener"
                >
                  <p className={style.links}>GitHub</p>
                </Link>
              </li>
              <li className={style.footer__menu__item}>
                <Link to="/" target="_blank" rel="noopener">
                  <p className={style.links}>Contacts</p>
                </Link>
              </li>
              <li className={style.footer__menu__item}>
                <Link to="/" target="_blank" rel="noopener">
                  <p className={style.links}>Rights</p>
                </Link>
              </li>
            </ul>
          </div>

          <div className={style.footer__button}>
            <p className={style.footer__button__text}>Back to top</p>
            <button
              className={style.footer__button__back}
              onClick={backToTop}
              type="button"
            >
              <img
                src="img/Arrow-left.png"
                alt="Back to top"
                className={style.footer__button__back__img}
              />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
