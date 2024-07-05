import { useContext } from 'react';
import { getIconSrc } from '../../../helpers/getIconSrc';
import { scrollToTop } from '../../../helpers/scrollToTop';
import './Footer.scss';
import { Link } from 'react-router-dom';
import {
  ThemeContext,
  ThemeType,
} from '../../../contexts/ThemeContext/ThemeContext';
import classNames from 'classnames';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="footer">
      <div className="container footer__wrap">
        <Link to="/" className="footer__logo">
          <img
            src={getIconSrc('logo', theme)}
            alt="logo"
            className="footer__logo-icon"
          />
        </Link>

        <div className="footer__nav">
          <a
            href="https://github.com/AlinaOvod"
            className="footer__nav-item uppercase"
            target="_blank"
            rel="noreferrer"
          >
            GitHub{' '}
          </a>
          <a
            href="https://github.com/AlinaOvod"
            className="footer__nav-item uppercase"
            target="_blank"
            rel="noreferrer"
          >
            Contacts
          </a>
          <a
            href="https://github.com/AlinaOvod"
            className="footer__nav-item uppercase"
            target="_blank"
            rel="noreferrer"
          >
            Rights
          </a>
        </div>

        <div className="footer__right">
          <button
            className="footer__back-button"
            onClick={() => scrollToTop('smooth')}
          >
            <span className="small-text">Back to top</span>
            <div
              className={classNames('footer__back-button-icon', {
                dark: theme === ThemeType.DARK,
              })}
            >
              <img
                src={getIconSrc(
                  theme === ThemeType.DARK ? 'arrow-up-top' : 'arrow-up',
                  theme,
                )}
                alt="Back to top"
                className="icon"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
