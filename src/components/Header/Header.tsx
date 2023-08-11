/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { getScreenType } from '../../helpers/getScreenType';
import { makeUrl } from '../../helpers/makeUrl';
import {
  HEADER_LEFT_NAV_LINKS,
  HEADER_RIGHT_NAV_LINKS,
} from '../../helpers/NavLinks';

import { Resolutions } from '../../types/Resolutions';
import { NavLink as HeaderLink } from '../../types/NavLink';

import { Logo } from '../Logo/Logo';

import './Header.scss';

export const Header: React.FC = React.memo(() => {
  const [screenType, setScreenType] = useState(getScreenType());
  const [isMenuOpened] = useState(false);

  const handleResize = () => setScreenType(getScreenType());

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header
      className="header"
    >
      <div className="container">
        <nav className="header__nav">
          <ul className="header__nav-list">
            {screenType !== Resolutions.Desktop && (
              <li className="header__nav-list-item">
                <button
                  className="header__nav-list-button"
                  type="button"
                >
                  <svg
                    className="icon icon--burger"
                    width="39"
                    height="29"
                    viewBox="0 0 39 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      y1="1.5"
                      x2="39"
                      y2="1.5"
                      stroke="black"
                      strokeWidth="3"
                    />

                    <line
                      y1="14.5"
                      x2="39"
                      y2="14.5"
                      stroke="black"
                      strokeWidth="3"
                    />

                    <line
                      y1="27.5"
                      x2="39"
                      y2="27.5"
                      stroke="black"
                      strokeWidth="3"
                    />
                  </svg>
                </button>
              </li>
            )}

            {screenType === Resolutions.Desktop
              && HEADER_LEFT_NAV_LINKS.map(link => (
                <li
                  className="header__nav-list-item"
                  key={link}
                >
                  <NavLink
                    className="header__nav-list-link"
                    to={makeUrl(link)}
                  >
                    {link}
                  </NavLink>
                </li>
              ))}

            <li className="header__nav-list-item">
              <Logo
                className="header__nav-list-link"
              />
            </li>

            {screenType === Resolutions.Desktop
              && HEADER_RIGHT_NAV_LINKS.map(link => (
                <li
                  className="header__nav-list-item"
                  key={link}
                >
                  <NavLink
                    className="header__nav-list-link"
                    to={makeUrl(link)}
                  >
                    {link}
                  </NavLink>
                </li>
              ))}

            {screenType !== Resolutions.Desktop && !isMenuOpened && (
              <li className="header__nav-list-item">
                <NavLink
                  className="header__nav-list-link"
                  to={makeUrl(HeaderLink.Bag)}
                >
                  {HeaderLink.Bag}
                </NavLink>
              </li>
            )}

            {screenType !== Resolutions.Desktop && isMenuOpened && (
              <li className="header__nav-list-link">
                <button
                  type="button"
                >
                  Close
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
});
