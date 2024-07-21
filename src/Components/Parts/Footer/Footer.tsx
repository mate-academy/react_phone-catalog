import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Pathname } from '../../../types/Pathname';
import './Footer.scss';
import { Logo } from '../Logo/Logo';

const Footer = memo(() => {
  const scrollToTop = () => {
    document.querySelector('.header')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isHidenBtnToTop = useLocation().pathname === Pathname.Cart;

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <Logo />
          <ul className="footer__list">
            <li className="footer__item">
              <a
                href="https://github.com/vanya-kalyenichenko"
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                github
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://github.com/vanya-kalyenichenko"
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                contacts
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://github.com/vanya-kalyenichenko"
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
            aria-label="Go Top"
            onClick={scrollToTop}
            className="footer__go-top"
          >
            <div className="footer__go-top--text">Back to top</div>
            <div
              className={classNames('button__small', 'button__small--up', {
                'button__small--hiden': isHidenBtnToTop,
              })}
            />
          </button>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
