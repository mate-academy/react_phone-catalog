/* eslint-disable max-len */
import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import classNames from 'classnames';
import { HeartSVG } from '../../assets/HeartSVG';
import { ShoppingBagSVG } from '../../assets/ShoppingBagSVG';
import { MenuSVG } from '../../assets/MenuSVG';
import { CloseSVG } from '../../assets/CloseSVG';
import { useState } from 'react';
import { LogoSVG } from '../../assets/LogoSVG';

export const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const useSidebar = () => {
    document.body.style.overflow = sidebar ? 'hidden' : 'auto';

    setSidebar(!sidebar);
  };

  return (
    <div className={s.aside_header}>
      <header className={s.header}>
        <nav className={`${s.nav} ${s.container}`}>
          <a href="#" className={s.logo}>
            <LogoSVG />
          </a>
          <ul className={`${s.nav__list} ${s.controls__visible}`}>
            <li className={s.nav__item}>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  classNames(s.nav__link, { [s.isActive]: isActive })
                }
              >
                <span className={s.nav__link_text}>home</span>
              </NavLink>
            </li>
            <li className={s.nav__item}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  classNames(s.nav__link, { [s.isActive]: isActive })
                }
              >
                <span className={s.nav__link_text}>phones</span>
              </NavLink>
            </li>
            <li className={s.nav__item}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  classNames(s.nav__link, { [s.isActive]: isActive })
                }
              >
                <span className={s.nav__link_text}>tablets</span>
              </NavLink>
            </li>
            <li className={s.nav__item}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  classNames(s.nav__link, { [s.isActive]: isActive })
                }
              >
                <span className={s.nav__link_text}>accessories</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={s.controls}>
          <div className={s.controls__visible}>
            <NavLink to="heart">
              <HeartSVG />
            </NavLink>
            <NavLink to="shopping-bag">
              <ShoppingBagSVG />
            </NavLink>
          </div>
          <div className={s.controls__hidden} onClick={useSidebar}>
            {sidebar ? <CloseSVG /> : <MenuSVG />}
          </div>
        </div>
      </header>

      {sidebar && (
        <aside className={s.aside}>
          <ul className={s.nav__list}>
            <li className={s.nav__item} onClick={useSidebar}>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  classNames(s.nav__link, { [s.isActive]: isActive })
                }
              >
                <span className={s.nav__link_text}>home</span>
              </NavLink>
            </li>
            <li className={s.nav__item}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  classNames(s.nav__link, { [s.isActive]: isActive })
                }
              >
                <span className={s.nav__link_text}>phones</span>
              </NavLink>
            </li>
            <li className={s.nav__item}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  classNames(s.nav__link, { [s.isActive]: isActive })
                }
              >
                <span className={s.nav__link_text}>tablets</span>
              </NavLink>
            </li>
            <li className={s.nav__item}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  classNames(s.nav__link, { [s.isActive]: isActive })
                }
              >
                <span className={s.nav__link_text}>accessories</span>
              </NavLink>
            </li>
          </ul>
          <div className={s.controls__bottom}>
            <NavLink to="heart" className={s.controls__bottom_link}>
              <HeartSVG containerClass={s.controls__bottom_button} />
            </NavLink>
            <NavLink to="shopping-bag" className={s.controls__bottom_link}>
              <ShoppingBagSVG containerClass={s.controls__bottom_button} />
            </NavLink>
          </div>
        </aside>
      )}
    </div>
  );
};
