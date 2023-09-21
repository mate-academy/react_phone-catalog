import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BURGER_NAV_LINKS } from '../../helpers/NavLinks';
import { makeUrl } from '../../helpers/makeUrl';

import { Resolutions } from '../../types/Resolutions';

import { Header } from '../Header/Header';

import './Burger.scss';

type Props = {
  classNames: string,
  isMenuOpened: boolean,
  setIsMenuOpened: (
    param: boolean | ((prevState: boolean) => boolean)
  ) => void,
  screenType: Resolutions,
  setScreenType: (param: Resolutions) => void,
};

export const Burger: React.FC<Props> = React.memo(({
  classNames,
  isMenuOpened,
  setIsMenuOpened,
  screenType,
  setScreenType,
}) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  return (
    <div className={classNames}>
      <Header
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
        screenType={screenType}
        setScreenType={setScreenType}
      />

      <div className="container">
        <nav className="burger__nav">
          <ul className="burger__nav-list">
            {BURGER_NAV_LINKS.map(link => (
              <li
                className="burger__nav-list-item"
                key={link}
              >
                <NavLink
                  className="burger__nav-list-link"
                  to={{
                    pathname: makeUrl(link),
                    search: searchParams.toString(),
                  }}
                  onClick={() => setIsMenuOpened(false)}
                >
                  {t(link)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
});
