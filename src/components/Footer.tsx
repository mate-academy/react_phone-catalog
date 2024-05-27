// import React from 'react';
import { useEffect, useState } from 'react';
import Logo from '../img/logo.svg';
import Back from '../img/Slider button right.png';
import { useAppContext } from './Context';

/* eslint-disable jsx-a11y/anchor-is-valid */

export const Footer = () => {
  const { urlState } = useAppContext();
  const [hasVerticalScroll, setHasVerticalScroll] = useState(false);

  useEffect(() => {
    const checkVerticalScroll = () => {
      // eslint-disable-next-line max-len
      const hasScroll = document.documentElement.scrollHeight > document.documentElement.clientHeight;

      setHasVerticalScroll(hasScroll);
    };

    checkVerticalScroll();

    window.addEventListener('resize', checkVerticalScroll);
    window.addEventListener('scroll', checkVerticalScroll);

    return () => {
      window.removeEventListener('resize', checkVerticalScroll);
      window.removeEventListener('scroll', checkVerticalScroll);
    };
  }, [urlState]);

  return (
    <div className="footer__wrapp">
      <footer className="footer">
        <a href="#">
          <img src={Logo} className="footer__logo" alt="logo" />
        </a>
        <nav className="nav nav-footer">
          <ul className="nav__list nav-footer__list">
            <li className="footer__nav__list__row">
              <a
                href="https://github.com/OleksChernikov"
                target="_blank"
                className="footer__nav__list__row__link"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="footer__nav__list__row">
              <a
                href="https://github.com/OleksChernikov"
                target="_blank"
                className="footer__nav__list__row__link"
                rel="noreferrer"
              >
                Contacts
              </a>
            </li>
            <li className="footer__nav__list__row">
              <a
                href="https://github.com/OleksChernikov"
                target="_blank"
                className="footer__nav__list__row__link"
                rel="noreferrer"
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>
        <div
          role="button"
          tabIndex={0}
          onClick={() => window.scrollTo(0, 0)}
          className="footer__link"
          style={!hasVerticalScroll ? { display: 'none' } : {}}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              window.scrollTo(0, 0);
            }
          }}
        >
          {' '}
          Back to top
          <img
            src={Back}
            className="footer__link__icon"
            alt="icon"
          />
        </div>
      </footer>
    </div>
  );
};
