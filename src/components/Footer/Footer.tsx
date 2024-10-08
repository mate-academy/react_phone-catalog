import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../utils/store';

export const Footer: React.FC = () => {
  const theme = useAppSelector(state => state.theme);

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="footer">
      <div className="footer__logo__wrapper">
        <div className="footer__logo">
          <a
            href="#home"
            className={cn('footer__logo__image', {
              'is-dark': theme === 'dark',
            })}
          ></a>
        </div>
      </div>

      <nav className="footer__nav">
        <ul className="footer__nav__list">
          <li>
            <a href="https://github.com/indigo04" className="nav__link">
              Github
            </a>
          </li>
          <li>
            <a href="https://github.com/indigo04" className="nav__link">
              Contacts
            </a>
          </li>
          <li>
            <a href="https://github.com/indigo04" className="nav__link">
              Rights
            </a>
          </li>
        </ul>
      </nav>

      <div className="back">
        <div onClick={scrollToTop} className="back__text">
          Back to top
        </div>
        <div className="arrow__button">
          <div className="up__arrow button" onClick={scrollToTop}></div>
        </div>
      </div>
    </footer>
  );
};
