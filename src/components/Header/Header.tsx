import './Header.scss';
import { NavLink } from 'react-router-dom';
import { MenuItems } from '../MenuItems/MenuItems';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export const Header = () => {
  return (
    <header className="Header">
      <NavLink to="/" className="Header_logo" />

      <BurgerMenu />

      <MenuItems />
    </header>
  );
};
