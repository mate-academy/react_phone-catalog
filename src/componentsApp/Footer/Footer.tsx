/* eslint-disable max-len */
import React, { useContext } from 'react';
import './Footer.scss';
import logoDark from '../../assets/img/Logo-White.svg';

import { StateContext } from '../../context/ContextReducer';

import cn from 'classnames';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { darkThem } = useContext(StateContext);

  const logoWhite =
    'https://olehmarushchak.github.io/react_phone-catalog/static/media/Logo.1f9dda44b9bba4aadcc081345bdf963c.svg';

  const logo = darkThem ? logoDark : logoWhite;

  return (
    <footer className={cn('Footer', { dark: darkThem })}>
      <div className="Footer__items">
        <div className="Footer__items__logo">
          <Link to="/">
            <img src={logo} className="Navbar__logo" alt="logo" />
          </Link>
        </div>

        <div className="Footer__items__info">
          <ul className="Footer__items__info__list">
            <li className="Footer__items__info__list__item">
              <a
                href="https://github.com/olehmarushchak/react_phone-catalog?tab=readme-ov-file"
                className={cn('Footer__items__info__list__link', {
                  dark: darkThem,
                })}
              >
                Github
              </a>
            </li>

            <li className="Footer__items__info__list__item">
              <a
                href="/"
                className={cn('Footer__items__info__list__link', {
                  dark: darkThem,
                })}
              >
                Contacts
              </a>
            </li>

            <li className="Footer__items__info__list__item">
              <a
                href="/"
                className={cn('Footer__items__info__list__link', {
                  dark: darkThem,
                })}
              >
                Rights
              </a>
            </li>
          </ul>
        </div>

        <div className="Footer__items__back">
          <p className="Footer__items__back__text">Back to top</p>

          <a
            onClick={() => window.scrollTo(0, 0)}
            className={cn('Footer__items__back__button', { dark: darkThem })}
          ></a>
        </div>
      </div>
    </footer>
  );
};
