import './Footer.scss';

import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

import { Logo } from '../Logo';

export const Footer: React.FC = () => {
  const scrollUp = () => {
    document.querySelector('.page')?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="page__footer footer">
      <div className="footer__container">
        <div className="footer__content">
          <Logo />

          <ul className="footer__list">
            <li className="footer__item">
              <Link
                to="https://github.com/oleksusov"
                target="_blank"
                className="footer__link"
              >
                github
              </Link>
            </li>

            <li className="footer__item">
              <Link
                to="contacts"
                target="_blank"
                className="footer__link"
              >
                contacts
              </Link>
            </li>

            <li className="footer__item">
              <Link
                to="right"
                target="_blank"
                className="footer__link"
              >
                rights
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className={classNames(
              'footer__button',
              'button-square',
            )}
            onClick={scrollUp}
          >
            <img
              src="/img/icons/arrow_up.svg"
              alt="arrow up"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
