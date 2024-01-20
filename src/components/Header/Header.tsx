import { NavLink } from 'react-router-dom';
// import cn from 'classnames';
import { CartIcon } from '../../assets/icons/CartIcon';
import { FavoritesIcon } from '../../assets/icons/FavoritesIcon';
import { LogoIcon } from '../../assets/icons/LogoIcon';
import { NavBar } from '../NavBar/NavBar';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__navigation">
        {/* <div className="logo__container"> */}
        <NavLink to="/">
          <LogoIcon />
        </NavLink>

        <NavBar />
        {/* </div> */}
        {/* <NavBar /> */}
      </div>
      <div className="header__right-side-options">
        <NavLink to="/">
          <FavoritesIcon />
        </NavLink>

        <NavLink to="/">
          <CartIcon />
        </NavLink>
      </div>
    </header>
  );
};
