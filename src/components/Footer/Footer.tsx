import React from 'react';
import cn from 'classnames';
import './Footer.scss';
import { Link, NavLink } from 'react-router-dom';
import { scrollToTop } from '../../api/fetchClient';
// import ScrollToTop from 'react-scroll-to-top';
// import cn from 'classnames';

type Props = {
  darkTheme: boolean;
};

export const Footer: React.FC<Props> = ({ darkTheme }) => {
  return (
    <footer
      className={cn('footer', {
        'footer--dark-theme': darkTheme,
      })}
    >
      <div className="footer__container">
        <NavLink to="/" className="footer__logo">
          <img
            src="./images/logo/logo.svg"
            alt="Nice gadgets"
            className="footer__logo-image"
          />
        </NavLink>

        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li>
              <Link
                to="https://github.com/vinogradova8"
                target="_blank"
                className={cn('footer__link', {
                  'footer__link--dark-theme': darkTheme,
                })}
                rel="noreferrer"
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                to="contacts"
                className={cn('footer__link', {
                  'footer__link--dark-theme': darkTheme,
                })}
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link
                to="rights"
                className={cn('footer__link', {
                  'footer__link--dark-theme': darkTheme,
                })}
              >
                Rights
              </Link>
            </li>
          </ul>
        </nav>

        <div className="footer__back-to-top">
          <p className="footer__text">Back to top</p>

          <button
            type="button"
            className={cn('footer__button button icon-arrow-up', {
              'icon-arrow-up--dark-theme button--dark-theme': darkTheme,
            })}
            onClick={scrollToTop}
          ></button>
        </div>
      </div>
    </footer>
  );
};
