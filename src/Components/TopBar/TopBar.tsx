import { Link, NavLink } from 'react-router-dom';
import './top-bar.scss';
import './nav.scss';
import classNames from 'classnames';
import { Aside } from '../Aside/Aside';

type Props = {
  cartItemsCount: number;
};

export const TopBar: React.FC<Props> = ({ cartItemsCount }) => {
  const logo = new URL('../../images/Logo.png', import.meta.url).href;
  const fav = new URL(
    '../../images/fav/Icons/Favourites (Heart Like).svg',
    import.meta.url,
  ).href;
  const basket = new URL(
    '../../images/fav/Shopping bag (Cart).svg',
    import.meta.url,
  ).href;

  const navLink = [
    { id: '/', title: 'home' },
    { id: '/phones', title: 'phones' },
    { id: '/tablets', title: 'tablets' },
    { id: '/accessories', title: 'accessories' },
  ];

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('nav__link', {
      'nav__link-selected': isActive,
    });

  return (
    <div className="top-bar favourites__top">
      <div className="nav menu-nav">
        <Link to="#">
          <img className="top-bar__logo" src={logo} alt="Logo" />
        </Link>
        {navLink.map(link => (
          <nav className="nav__list" key={link.id}>
            <li className="nav__item">
              <NavLink to={link.id} className={getLinkClass}>
                {link.title}
              </NavLink>
            </li>
          </nav>
        ))}
      </div>
      <Aside />
      <div className="header__vectors">
        <Link to="#favourites">
          <button className="header__fav header__button">
            <img src={fav} className="header__fav-img" alt="Favourites" />
          </button>
        </Link>
        <Link to="#basket">
          <button className="header__basket header__button">
            <img src={basket} className="header__basket-img" alt="basket" />
            <div className="header__basket-count">
              <span className="header__basket-count-number">
                {cartItemsCount}
              </span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};
