import classNames from 'classnames';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.scss';
import logo from '../../img/logo.png';

type Props = {
  isOpen: boolean,
  handleIsOpen: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,

};

export const HeaderMobile: React.FC<Props> = ({
  isOpen,
  handleIsOpen,
  setOpen,
}) => {
  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <Menu isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
      <NavLink
        to="/"
        className="nav__logo"
        onClick={closeSideBar}
      >
        <img src={logo.toString()} alt="logo" />
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) => classNames('nav__link', {
          'nav__link--active': isActive,
        })}
        onClick={closeSideBar}
      >
        Home
      </NavLink>
      <NavLink
        to="/phones"
        className="menu-item"
        onClick={closeSideBar}
      >
        Phones
      </NavLink>
      <NavLink
        to="/tablets"
        className={({ isActive }) => classNames('nav__link', {
          'nav__link--active': isActive,
        })}
        onClick={closeSideBar}
      >
        Tablets
      </NavLink>
      <NavLink
        to="/accessories"
        className={({ isActive }) => classNames('nav__link', {
          'nav__link--active': isActive,
        })}
        onClick={closeSideBar}
      >
        Accessories
      </NavLink>
    </Menu>
  );
};
