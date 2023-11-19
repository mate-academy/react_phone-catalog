/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getScreenType } from '../../helpers/getScreenType';
import { makeUrl } from '../../helpers/makeUrl';
import { HEADER_LEFT_NAV_LINKS } from '../../helpers/NavLinks';
import { resetSearchParams } from '../../helpers/resetSearchParams';

import '../../i18n';
import { Resolutions } from '../../types/Resolutions';
import { NavLink as HeaderLink } from '../../types/NavLink';

import { Logo } from '../Logo/Logo';

import './Header.scss';

type Props = {
  isMenuOpened?: boolean,
  setIsMenuOpened?: React.Dispatch<React.SetStateAction<boolean>>,
  screenType?: Resolutions,
  setScreenType?: React.Dispatch<React.SetStateAction<Resolutions>>,
  setIsSearchOpened?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsBagOpened?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsWishlistOpened?: React.Dispatch<React.SetStateAction<boolean>>,
};

export const Header: React.FC<Props> = React.memo(({
  isMenuOpened = false,
  setIsMenuOpened = () => { },
  screenType = Resolutions.Mobile,
  setScreenType = () => { },
  setIsSearchOpened = () => { },
  setIsBagOpened = () => { },
  setIsWishlistOpened = () => { },
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
    <header className="header">
      <div className="container">
        <nav className="header__nav">
          <ul className="header__nav-list">
            {screenType !== Resolutions.Desktop && (
              <li className="header__nav-list-item">
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpened(false);
                    setIsMenuOpened(prevState => !prevState);
                  }}
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

            {screenType === Resolutions.Desktop && (
              <>
                <li className="header__nav-list-item">
                  <NavLink
                    className="header__nav-list-link"
                    to={{
                      pathname: `${makeUrl(HeaderLink.AllGender)}`,
                      search: `${resetSearchParams(searchParams)}?year=2022`,
                    }}
                  >
                    {t(HeaderLink.NewArrivals)}
                  </NavLink>
                </li>

                {HEADER_LEFT_NAV_LINKS.map(link => (
                  <li className="header__nav-list-item" key={link}>
                    <NavLink
                      className="header__nav-list-link"
                      to={{
                        pathname: makeUrl(link),
                        search: resetSearchParams(searchParams),
                      }}
                    >
                      {t(link)}
                    </NavLink>
                  </li>
                ))}

                <li className="header__nav-list-item">
                  <button
                    className="header__nav-list-button"
                    type="button"
                    onClick={() => setIsSearchOpened(prev => !prev)}
                  >
                    {t(HeaderLink.Search)}
                  </button>
                </li>
              </>
            )}

            <li className="header__nav-list-item">
              <Logo
                className="header__nav-list-link"
                setIsMenuOpened={() => setIsMenuOpened(false)}
              />
            </li>

            {screenType === Resolutions.Desktop && (
              <>
                <li className="header__nav-list-item">
                  <NavLink
                    className="header__nav-list-link"
                    to={{
                      pathname: makeUrl(HeaderLink.Delivering),
                      search: resetSearchParams(searchParams),
                    }}
                  >
                    {t(HeaderLink.Delivering)}
                  </NavLink>
                </li>

                <li className="header__nav-list-item">
                  <button
                    className="header__nav-list-link"
                    type="button"
                    onClick={() => setIsBagOpened(true)}
                  >
                    {t(HeaderLink.Bag)}
                  </button>
                </li>

                <li className="header__nav-list-item">
                  <button
                    className="header__nav-list-link"
                    type="button"
                    onClick={() => setIsWishlistOpened(true)}
                  >
                    {t(HeaderLink.WishList)}
                  </button>
                </li>

                <li className="header__nav-list-item">
                  <NavLink
                    className="header__nav-list-link"
                    to={{
                      pathname: makeUrl(HeaderLink.Profile),
                      search: resetSearchParams(searchParams),
                    }}
                  >
                    {t(HeaderLink.Profile)}
                  </NavLink>
                </li>
              </>
            )}

            {screenType !== Resolutions.Desktop && !isMenuOpened && (
              <li className="header__nav-list-item">
                <button
                  className="header__nav-list-link"
                  type="button"
                  onClick={() => setIsBagOpened(true)}
                >
                  {t(HeaderLink.Bag)}
                </button>
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
