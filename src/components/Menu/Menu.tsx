import { NavLink } from 'react-router-dom';
import menu from './Menu.module.scss';
import cn from 'classnames';

export const Menu = () => {
  return (
    <aside className={menu.menu}>
      <div className="container">
        <div className="menu__content">
          <nav className={cn(menu.menu__nav, menu.nav)}>
            <ul className={menu.nav__list}>
              <li className={menu.nav__item}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    cn(menu.nav__link, {
                      [menu['link--active']]: isActive,
                    })
                  }
                >
                  home
                </NavLink>
              </li>
              <li className={menu.nav__item}>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    cn(menu.nav__link, {
                      [menu['link--active']]: isActive,
                    })
                  }
                >
                  phones
                </NavLink>
              </li>
              <li className={menu.nav__item}>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    cn(menu.nav__link, {
                      [menu['link--active']]: isActive,
                    })
                  }
                >
                  tablets
                </NavLink>
              </li>
              <li className={menu.nav__item}>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    cn(menu.nav__link, {
                      [menu['link--active']]: isActive,
                    })
                  }
                >
                  accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={cn(menu.menu__actions, menu.actions)}>
        <ul className={menu.actions__list}>
          <li className={menu.actions__item}>
            <NavLink
              to="favourites"
              className={({ isActive }) =>
                cn(menu.actions__link, menu.actions__link__fav, {
                  [menu['link--active']]: isActive,
                })
              }
            ></NavLink>
          </li>
          <li className={menu.actions__item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(menu.actions__link, menu.actions__link__cart, {
                  [menu['link--active']]: isActive,
                })
              }
            ></NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
