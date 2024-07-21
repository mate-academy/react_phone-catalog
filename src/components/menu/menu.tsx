import { Link, NavLink } from 'react-router-dom';

import classNames from 'classnames';
import heart from '../../img/icons/heart.svg';
import bag from '../../img/icons/bag.svg';
import { useEffect, useState } from 'react';

export const Menu: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    return () => setVisible(false);
  }, []);

  return (
    <div
      className={classNames('menu', {
        menu__visible: visible,
      })}
    >
      <div className="menu__nav-links">
        <NavLink
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
          to={'/catalog'}
          className={({ isActive }) =>
            classNames('menu__nav-link', {
              'menu__is-active': isActive,
            })
          }
        >
          Phones
        </NavLink>
        <NavLink
          to={'/catalog'}
          className={({ isActive }) =>
            classNames('menu__nav-link', {
              'menu__is-active': isActive,
            })
          }
        >
          Tablets
        </NavLink>
        <NavLink
          to={'/catalog'}
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
        <Link className="menu__icon-link" to={'/favorites'}>
          <img src={heart} alt="heart" />
        </Link>
        <Link className="menu__icon-link" to={'/cart'}>
          <img src={bag} alt="bag" />
        </Link>
      </div>
    </div>
  );
};
