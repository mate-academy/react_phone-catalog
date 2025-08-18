import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import style from './SideBar.module.scss';
import { Action } from './../../Header/Actions';
import { useEffect } from 'react';

interface Props {
  links: { title: string; path: string }[];
  burgerOpen: boolean;
}

export const SideBar: FC<Props> = ({ links, burgerOpen }) => {
  useEffect(() => {
    if (burgerOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [burgerOpen]);

  return (
    <aside
      className={`${style.sidebar} ${burgerOpen ? style['sidebar--open'] : ''}`}
    >
      <nav
        className={`${style.sidebar__nav} ${
          burgerOpen ? style['sidebar__menu--open'] : ''
        }`}
      >
        <ul className={style.sidebar__list}>
          {links.map(({ title, path }) => (
            <li className={style.sidebar__item} key={title}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${style.sidebar__link} ${style['sidebar__link--active']}`
                    : style.sidebar__link
                }
                to={path}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Action />
    </aside>
  );
};
