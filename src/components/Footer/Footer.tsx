import classNames from 'classnames';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import arrowUp from '../../assets/svg/arrowUp.svg';
import { Pathname } from '../../types/Pathname';
import './footer.scss';

export const Footer = memo(() => {
  const scrollToTop = () => {
    document.querySelector('.header')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isBtnToTop = useLocation().pathname === Pathname.Cart;

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <Logo />
          <ul className="footer__list">
            <li className="footer__item">
              <a
                href="https://github.com/"
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                github
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://github.com/"
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                contacts
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://github.com/"
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                rights
              </a>
            </li>
          </ul>
          <button
            type="button"
            className={classNames('footer__button button-square', {
              'footer__button--hiden': isBtnToTop,
            })}
            onClick={scrollToTop}
          >
            <img src={arrowUp} alt="arrowUp" />
          </button>
        </div>
      </div>
    </footer>
  );
});
