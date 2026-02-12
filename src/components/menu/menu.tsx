import { NavLink } from 'react-router-dom';

import classNames from 'classnames';
import heart from '../../img/icons/heart.svg';
import bag from '../../img/icons/bag.svg';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  setFocusMenu: Dispatch<SetStateAction<boolean>>;
};

export const Menu: React.FC<Props> = ({ setFocusMenu }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={classNames('menu', {
        menu__visible: visible,
      })}
    >
      <div className="menu__nav-links">
        <NavLink
          onClick={() => setFocusMenu(false)}
          to={'/'}
          className={({ isActive }) =>
            classNames('menu__nav-link', {
              'menu__is-active': isActive,
            })
          }
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => setFocusMenu(false)}
          to={'/phones'}
          className={({ isActive }) =>
            classNames('menu__nav-link', {
              'menu__is-active': isActive,
            })
          }
        >
          Phones
        </NavLink>
        <NavLink
          onClick={() => setFocusMenu(false)}
          to={'/tablets'}
          className={({ isActive }) =>
            classNames('menu__nav-link', {
              'menu__is-active': isActive,
            })
          }
        >
          Tablets
        </NavLink>
        <NavLink
          onClick={() => setFocusMenu(false)}
          to={'/accessories'}
          className={({ isActive }) =>
            classNames('menu__nav-link', {
              'menu__is-active': isActive,
            })
          }
        >
          Accessories
        </NavLink>
      </div>
      <div className="menu__icon-links">
        <NavLink
          className={({ isActive }) =>
            classNames('menu__icon-link', {
              'menu__is-active': isActive,
            })
          }
          onClick={() => setFocusMenu(false)}
          to={'/favorites'}
        >
          <img src={heart} alt="heart" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames('menu__icon-link', {
              'menu__is-active': isActive,
            })
          }
          onClick={() => setFocusMenu(false)}
          to={'/cart'}
        >
          <img src={bag} alt="bag" />
        </NavLink>
      </div>
    </div>
  );
};
