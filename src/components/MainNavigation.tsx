import { NavLink } from 'react-router-dom';
import { Logo } from '../UI/Logo';
import classes from './MainNavigation.module.scss';
import { FavoritesIcon } from '../UI/FavoritesIcon';
import { ShopIcon } from '../UI/ShopIcon';
// import cl from 'classnames';

export const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </li>
          <li className={classes.link}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={classes.link}>
            <NavLink to="/phones">Phones</NavLink>
          </li>
          <li className={classes.link}>
            <NavLink to="/tablets">Tablets</NavLink>
          </li>
          <li className={classes.link}>
            <NavLink to="/accesories">Acsesories</NavLink>
          </li>
        </ul>

        <ul className={classes.list__left}>
          <li className={classes.link}>
            <NavLink to="/favorites">
              <FavoritesIcon />
            </NavLink>
          </li>
          <li className={classes.link}>
            <NavLink to="/cart">
              <ShopIcon />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
