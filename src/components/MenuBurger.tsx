import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import CloseBlack from '../img/Close-black.svg';
import Logo from '../img/logo.svg';
import { useAppContext } from './Context';

export const MenuBurger = () => {
  const { isMenuBurger, setIsMenuBurger } = useAppContext();

  return (
    <section className={cn(
      'burger-menu__wrapper',
      { 'burger-menu__wrapper--active': isMenuBurger },
    )}
    >
      <div className="burger-menu__content">
        <header className="header">
          <NavLink to="/" data-cy="categoryLinksContainer" end>
            <img src={Logo} className="header__logo" alt="logo" />
          </NavLink>
          <nav className="nav" data-cy="categoryLinksContainer" />
          <div
            className={cn(
              'header__link',
              'basket',
              'display-none',
            )}
            role="button"
            tabIndex={0}
            onClick={() => setIsMenuBurger(!isMenuBurger)}
          >
            <img
              src={CloseBlack}
              className="header__link-icon"
              alt=""
            />
          </div>
        </header>
        <ul className="burger-menu__list">
          <li className="burger-menu__list__line">
            home
          </li>
          <li className="burger-menu__list__line">
            phones
          </li>
          <li className="burger-menu__list__line">
            tablets
          </li>
          <li className="burger-menu__list__line">
            accessories
          </li>
        </ul>
      </div>
    </section>
  );
};
