/* eslint-disable max-len */
import React, { useContext } from 'react';
import './Footer.scss';
import logoWhite from '../../assets/img/Logo.svg';
import logoDark from '../../assets/img/Logo-White.png';
import { StateContext } from '../../context/ContextReducer';

import cn from 'classnames';

export const Footer: React.FC = () => {
  const { darkThem } = useContext(StateContext);

  const logo = darkThem ? logoDark : logoWhite;

  return (
    <footer className={cn('Footer', { dark: darkThem })}>
      <div className="Footer__items">
        <div className="Footer__items__logo">
          <a href="/">
            <img src={logo} className="Navbar__logo" alt="logo" />
          </a>
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
