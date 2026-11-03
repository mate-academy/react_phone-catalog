// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import './Navbar.scss';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/home">
          <img src="/img/logo.png" alt="nice gadjets" />
        </Link>
        <ul
          className={
            showMenu ? 'navbar__menu navbar__menu--active' : 'navbar__menu'
          }
        >
          <li
            className={
              location.pathname === '' || location.pathname === '/'
                ? 'navbar__item navbar__item--active'
                : 'navbar__item'
            }
          >
            <Link to="/home" className="navbar__link">
              Home
            </Link>
          </li>
          <li
            className={
              location.pathname === '/phones'
                ? 'navbar__item navbar__item--active'
                : 'navbar__item'
            }
          >
            <Link to="/phones" className="navbar__link">
              Phones
            </Link>
          </li>
          <li
            className={
              location.pathname === '/tablets'
                ? 'navbar__item navbar__item--active'
                : 'navbar__item'
            }
          >
            <Link to="/tablets" className="navbar__link">
              Tablets
            </Link>
          </li>
          <li
            className={
              location.pathname === '/accessories'
                ? 'navbar__item navbar__item--active'
                : 'navbar__item'
            }
          >
            <Link to="/accessories" className="navbar__link">
              Accessories
            </Link>
          </li>
        </ul>
        <ul
          className={
            showMenu ? 'navbar__icons navbar__icons--active' : 'navbar__icons'
          }
        >
          <li
            className={
              location.pathname === '/favorites'
                ? 'navbar__icon navbar__icon--active'
                : 'navbar__icon'
            }
          >
            <Link to="/favorites">
              <img src="/img/heart.svg" alt="heart icon svg" />
            </Link>
          </li>
          <li
            className={
              location.pathname === '/cart'
                ? 'navbar__icon navbar__icon--active'
                : 'navbar__icon'
            }
          >
            <Link to="/cart">
              <img src="/img/shopping-bag.svg" alt="bag icon svg" />
            </Link>
          </li>
        </ul>
        <button
          className="navbar__toggle"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            src={showMenu ? '/img/close.svg' : '/img/menu.svg'}
            alt="menu icon png"
            className="navbar__button"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
