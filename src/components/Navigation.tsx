import { Link, useLocation } from 'react-router-dom';
import './Navigation.scss';
import './Grid.scss';
import logo from '../img/Logo.png';
import Cart from '../img/Cart.svg';
import Favourites from '../img/Favourites.svg';
import classNames from 'classnames';

export const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="navigation">
        <div className="navigation-left">
          <Link to={'/'} className="logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
          <Link
            to={'/'}
            className={classNames('nav-item', {
              'is-active': pathname === '/',
            })}
          >
            Home
          </Link>
          <Link
            to={'/phones'}
            className={classNames('nav-item', {
              'is-active': pathname.startsWith('/phones'),
            })}
          >
            Phones
          </Link>
          <Link
            to={'/tablets'}
            className={classNames('nav-item', {
              'is-active': pathname.startsWith('/tablets'),
            })}
          >
            Tablets
          </Link>
          <Link
            to={'/accessories'}
            className={classNames('nav-item', {
              'is-active': pathname.startsWith('/accessories'),
            })}
          >
            Accessories
          </Link>
        </div>

        <div className="navigation-right">
          <Link to={'/favorites'} className="nav-item">
            <img src={Favourites} className="icon" alt="Favourites" />
          </Link>
          <Link to={'/cart'} className="nav-item">
            <img src={Cart} className="icon" alt="Cart" />
          </Link>
        </div>
      </div>
    </>
  );
};
