import { NavLink } from 'react-router-dom';
import { MenuItems } from '../MenuItems/MenuItems';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

import '../../styles/utils/main.scss';
import './Header.scss';

export const Header = () => {
  return (
    <header className="Header Header__container">
      <NavLink to="/" className="Header__logo icon--logo" />

      <BurgerMenu />

      <MenuItems />
    </header>
  );
};
