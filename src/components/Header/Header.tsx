import { NavLink } from 'react-router-dom';
// import cn from 'classnames';
import { CartIcon } from '../../assets/img/icons/CartIcon';
import { FavoritesIcon } from '../../assets/img/icons/FavoritesIcon';
import { LogoIcon } from '../../assets/img/icons/LogoIcon';
import { NavBar } from '../NavBar/NavBar';
import './Header.scss';

// const getLinkClass = ({ isActive }: { isActive: boolean }) => {
//   return cn({
//     'is-active': isActive,
//   });
// };

export const Header = () => {
  // const match = useMatch('/');

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
