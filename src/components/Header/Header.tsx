import { NavLink } from 'react-router-dom';
import { Button } from '../../shared/Button/Button';
import s from './Header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={`${s.nav} ${s.container}`}>
        <a href="#" className={s.logo}>
          <img src="../../icons/logo.svg" alt="logo" className={s.logo__img} />
        </a>

        <ul className={s.nav__list}>
          <li className={s.nav__item}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                classNames(s.nav__link, { [s.isActive]: isActive })
              }
            >
              <span className={s.nav__link_text}>home</span>{' '}
            </NavLink>
          </li>
          <li className={s.nav__item}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                classNames(s.nav__link, { [s.isActive]: isActive })
              }
            >
              <span className={s.nav__link_text}>phones</span>{' '}
            </NavLink>
          </li>
          <li className={s.nav__item}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                classNames(s.nav__link, { [s.isActive]: isActive })
              }
            >
              <span className={s.nav__link_text}>tablets</span>{' '}
            </NavLink>
          </li>
          <li className={s.nav__item}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                classNames(s.nav__link, { [s.isActive]: isActive })
              }
            >
              <span className={s.nav__link_text}>accessories</span>{' '}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={s.controls}>
        <div className={s.controls__visible}>
          <Button iconName="/heart" />
          <Button iconName="/shoping-bag" />
        </div>
        <div className={s.controls__hidden}>
          <Button iconName="/menu" />
        </div>
      </div>
    </header>
  );
};
