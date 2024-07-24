import './Footer.scss';
import './../../../shared/styles/Arrow-btn.scss';
import { HashLink as Link } from 'react-router-hash-link';
import classNames from 'classnames';
import { useContext } from 'react';
import { StateContext } from '../../../utils/GlobalStateProvider';

export const Footer = () => {
  const { isDarkThemeOn } = useContext(StateContext);

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <Link to="/home">
          {isDarkThemeOn ? (
            <img className="footer__logo-icon" src="./img/header/Logo.svg" />
          ) : (
            <img
              className="footer__logo-icon"
              src="./img/header/Logo-dark.svg"
            />
          )}
        </Link>
        <nav className="footer__nav">
          <ul className="footer__items">
            <li
              className={classNames('footer__item', {
                'footer__item--dark': !isDarkThemeOn,
              })}
            >
              <a
                href="https://github.com/BodyaKutsyk"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li
              className={classNames('footer__item', {
                'footer__item--dark': !isDarkThemeOn,
              })}
            >
              <Link to="contacts">Contacts</Link>
            </li>
            <li
              className={classNames('footer__item', {
                'footer__item--dark': !isDarkThemeOn,
              })}
            >
              <Link to="rights">Rights</Link>
            </li>
          </ul>
        </nav>

        <div
          className={classNames('footer__lift', {
            'footer__item--dark': !isDarkThemeOn,
          })}
        >
          <Link className="footer__toTop" to="#welcome">
            Back to top
          </Link>
          <Link to="#welcome">
            <button
              className={classNames('arrow-btn', 'arrow-btn--up', {
                'arrow-btn--dark': !isDarkThemeOn,
              })}
            ></button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
