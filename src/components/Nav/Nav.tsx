/* eslint-disable max-len */
import { NavLink } from 'react-router-dom';
import { defaultParams, LINK_TO } from '../../constants';
import cl from 'classnames';
import s from './Nav.module.scss';
import { useTheme } from '../../context/ThemeContext';

import MoonIcon from '../../img/icons/icon-moon.svg?react';
import SunIcon from '../../img/icons/icon-sun.svg?react';

type Props = {
  isMenuOpen?: boolean;
};

const listItems = [
  LINK_TO.HOME,
  LINK_TO.PHONES,
  LINK_TO.TABLETS,
  LINK_TO.ACCESSORIES,
];

const linkTo = (link: string) => {
  if (link === '/') {
    return link;
  }

  return {
    pathname: link,
    search: defaultParams,
  };
};

export const Nav: React.FC<Props> = ({ isMenuOpen }) => {
  const getListClass = ({ isActive }: { isActive: boolean }) =>
    cl(s.Nav__link, {
      [s.Nav__linkActive]: isActive,
    });

  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className={s.Nav}>
      <ul
        className={cl(s.Nav__list, {
          [s.Nav__listMenu]: isMenuOpen,
        })}
      >
        {listItems.map(i => (
          <li key={i} className={s.Nav__item}>
            <NavLink to={linkTo(i)} className={getListClass}>
              {i === '/' ? 'home' : i.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>
      {!isMenuOpen && (
        <button
          onClick={handleTheme}
          className={cl(s.Nav__switchTheme, {
            [s.Nav__switchThemeDark]: theme === 'dark',
          })}
        >
          <MoonIcon className="icon" />
          <SunIcon className="icon" />
        </button>
      )}
    </nav>
  );
};
