/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getScreenType } from '../../helpers/getScreenType';
import { makeUrl } from '../../helpers/makeUrl';
import {
  HEADER_LEFT_NAV_LINKS,
  HEADER_RIGHT_NAV_LINKS,
} from '../../helpers/NavLinks';

import '../../i18n';
import { Resolutions } from '../../types/Resolutions';
import { NavLink as HeaderLink } from '../../types/NavLink';

import { Logo } from '../Logo/Logo';

import './Header.scss';

type Props = {
  isMenuOpened?: boolean,
  setIsMenuOpened?: (param: boolean | ((prevState: boolean) => boolean)) => void,
  screenType?: Resolutions,
  setScreenType?: (param: Resolutions) => void,
};

export const Header: React.FC<Props> = React.memo(({
  isMenuOpened = false,
  setIsMenuOpened = () => {},
  screenType = Resolutions.Mobile,
  setScreenType = () => {},
}) => {
  const handleResize = () => setScreenType(getScreenType());
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

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
                  type="button"
                  onClick={() => setIsMenuOpened(prevState => !prevState)}
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
                    to={{
                      pathname: makeUrl(link),
                      search: searchParams.toString(),
                    }}
                  >
                    {t(link)}
                  </NavLink>
                </li>
              ))}

            <li className="header__nav-list-item">
              <Logo
                className="header__nav-list-link"
                setIsMenuOpened={() => setIsMenuOpened(false)}
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
                    to={{
                      pathname: makeUrl(link),
                      search: searchParams.toString(),
                    }}
                  >
                    {t(link)}
                  </NavLink>
                </li>
              ))}

            {screenType !== Resolutions.Desktop && !isMenuOpened && (
              <li className="header__nav-list-item">
                <NavLink
                  className="header__nav-list-link"
                  to={{
                    pathname: makeUrl(HeaderLink.Bag),
                    search: searchParams.toString(),
                  }}
                >
                  {t(HeaderLink.Bag)}
                </NavLink>
              </li>
            )}

            {screenType !== Resolutions.Desktop && isMenuOpened && (
              <li className="header__nav-list-link">
                <button
                  type="button"
                  onClick={() => setIsMenuOpened(false)}
                >
                  <svg
                    className="icon icon--burger"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.62025"
                      y1="27.1522"
                      x2="26.8334"
                      y2="1.93909"
                      stroke="black"
                      strokeWidth="3"
                    />

                    <line
                      x1="2.06066"
                      y1="1.93934"
                      x2="27.2738"
                      y2="27.1525"
                      stroke="black"
                      strokeWidth="3"
                    />
                  </svg>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
});
