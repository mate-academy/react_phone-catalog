/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <footer className="footer">
      <div className="container footer__container">
        <Logo />

        <div className="footer__links">
          <Link
            to="https://levchenko-dmytro.github.io/react_phone-catalog"
            className="footer__link"
            target="_blank"
          >
            github
          </Link>
          <Link
            to="https://github.com/levchenko-dmytro"
            className="footer__link"
            target="_blank"
          >
            contacts
          </Link>
          <Link
            to="http://google.com"
            className="footer__link"
            target="_blank"
          >
            rights
          </Link>
        </div>

        <div
          className="footer__back-to-top back-to-top"
          style={{ visibility: visible ? 'visible' : 'hidden' }}
        >
          <button
            type="button"
            className="back-to-top__button"
            onClick={ScrollTop}
          >
            <span className="back-to-top__text">
              Back to top
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
