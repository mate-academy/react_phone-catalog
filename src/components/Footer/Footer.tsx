import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { goTop } from '../../helpers/fuctions/goTop';
import { useAlert } from '../../helpers/fuctions/useAlert';
import { NotImplemented } from '../NotImplemented';

export const Footer = () => {
  const [isAlertShown, setAlertShown] = useAlert(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <footer className="App__footer footer">
      <div className="footer__container _container">
        <Link
          to="/"
          className="footer__logo-link"
          onClick={goTop}
        >
          <img
            className="footer__logo-img"
            src="./img/icons/LOGO.svg"
            alt="Phones"
          />
        </Link>

        <nav className="footer__navbar">
          <ul className="footer__menu-list">
            <li className="footer__menu-item">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="footer__menu-link"
              >
                github
              </a>
            </li>

            <li className="footer__menu-item">
              <button
                type="button"
                className="footer__menu-link"
                onClick={setAlertShown}
              >
                contacts
              </button>
            </li>

            <li className="footer__menu-item">
              <button
                type="button"
                className="footer__menu-link"
                onClick={setAlertShown}
              >
                rights
              </button>
            </li>
          </ul>
        </nav>

        {showTopBtn && (
          <>
            <button
              type="button"
              className="footer__back-top-link"
              onClick={goTop}
            >
              Back to top
            </button>

            <button
              type="button"
              className="footer__back-top-button icon-button"
              onClick={goTop}
              aria-label="Mute volume"
            />
          </>
        )}
      </div>

      {isAlertShown && <NotImplemented callback={setAlertShown} />}
    </footer>
  );
};
