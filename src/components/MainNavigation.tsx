import { NavLink } from 'react-router-dom';
import { Logo } from '../UI/Logo';
import classes from './MainNavigation.module.scss';
import { FavoritesIcon } from '../UI/FavoritesIcon';
import { ShopIcon } from '../UI/ShopIcon';
import { useAppSelector } from '../app/hooks';
import {
  selectQuantityFavourites,
} from '../features/favouritesSlices/favouritesSlice';
import { selectQuantityCart } from '../features/cartSlices/cartSlice';

export const MainNavigation = () => {
  const quantityFavourites = useAppSelector(selectQuantityFavourites);
  const quantityCart = useAppSelector(selectQuantityCart);

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
              {quantityFavourites}
              <FavoritesIcon />
            </NavLink>
          </li>
          <li className={classes.link}>
            <NavLink to="/cart">
              {quantityCart}
              <ShopIcon />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
