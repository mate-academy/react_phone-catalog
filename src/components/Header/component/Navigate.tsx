import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import style from './Navigate.module.scss';
import logo from '../../../../public/img/my-icon/logo.svg';
import whiteLogo from '../../../../public/img/theme-dark/white-logo.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../../provider/ThemeContextProvider';

export const Navigate = ({ modifier }: { modifier?: string }) => {
  const { theme } = useContext(ThemeContext);

  const getLinkNav = ({ isActive }: { isActive: boolean }) =>
    cn(style.nav__link, {
      [style[`nav__link--${modifier}`]]: modifier,
      [style.active]: isActive,
    });

  return (
    <div
      className={cn(style.nav, {
        [style[`nav--${modifier}`]]: modifier,
      })}
    >
      <Link
        to={'/'}
        className={cn(style.nav__logo, {
          [style[`nav__logo--${modifier}`]]: modifier,
        })}
      >
        <img
          className={style.nav__logo__images}
          src={theme === 'white' ? logo : whiteLogo}
          alt="Nice gadget logo"
        />
      </Link>

      <div
        className={cn(style.nav__table, {
          [style[`nav__table--${modifier}`]]: modifier,
        })}
      >
        <NavLink className={getLinkNav} to={'/'} end>
          Home
        </NavLink>
        <NavLink className={getLinkNav} to={'/phones'}>
          Phones
        </NavLink>
        <NavLink className={getLinkNav} to={'/tablets'}>
          Tablets
        </NavLink>
        <NavLink className={getLinkNav} to={'/accessories'}>
          Accessories
        </NavLink>
      </div>
    </div>
  );
};
