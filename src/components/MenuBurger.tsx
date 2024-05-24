import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import CloseBlack from '../img/Close-black.svg';
import Logo from '../img/logo.svg';
import { useAppContext } from './Context';

export const MenuBurger = () => {
  const { isMenuBurger, setIsMenuBurger } = useAppContext();

  const { setUrlState } = useAppContext();
  const { setSelectedProduct } = useAppContext();

  const handleClick = (page: string) => {
    setIsMenuBurger(false);
    setUrlState(page);
    setSelectedProduct('');
  };

  return (
    <section
      className={cn('burger-menu__wrapper')}
      style={isMenuBurger ? { transform: 'translateX(0)', opacity: '1' } : undefined}
    >
      <div className="burger-menu__content">
        <header className="header">
          <NavLink to="/" data-cy="categoryLinksContainer" end>
            <img src={Logo} className="header__logo" alt="logo" />
          </NavLink>
          <nav className="nav" data-cy="categoryLinksContainer" />
          <button
            className={cn(
              'header__link',
              'basket',
              'display-none',
            )}
            type="button"
            onClick={() => setIsMenuBurger(!isMenuBurger)}
          >
            <img
              src={CloseBlack}
              className="header__link-icon"
              alt=""
            />
          </button>
        </header>
        <ul className="burger-menu__list">
          <NavLink
            to="/"
            onClick={() => handleClick('home')}
            className="burger-menu__link"
          >
            <li className="burger-menu__list__line">
              home
            </li>
          </NavLink>
          <NavLink
            to="/phones"
            onClick={() => handleClick('phones')}
            className="burger-menu__link"
          >
            <li className="burger-menu__list__line">
              phones
            </li>
          </NavLink>
          <NavLink
            to="/tablets"
            onClick={() => handleClick('tablets')}
            className="burger-menu__link"
          >
            <li className="burger-menu__list__line">
              tablets
            </li>
          </NavLink>
          <NavLink
            to="/accessories"
            onClick={() => handleClick('accessories')}
            className="burger-menu__link"
          >
            <li className="burger-menu__list__line">
              accessories
            </li>
          </NavLink>
        </ul>
      </div>
    </section>
  );
};
