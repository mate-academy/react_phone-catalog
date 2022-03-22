import classNames from 'classnames';
import {
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom';

type Props = {
  favorite: string[],
  cart: string[],
};

export const Header: React.FC<Props> = ({
  favorite,
  cart,
}) => {
  const params = useLocation();

  return (
    <header
      className={classNames('header',
        {
          header__home: params.pathname === '/',
          header__phones: params.pathname !== '/',
        })}
      id="header"
    >
      <div className="header__nav">
        <Link to="/" className="logo header__logo" />
        <nav className="nav">
          <NavLink to="/" className="nav__link">HOME</NavLink>
          <NavLink to="/phones" className="nav__link">PHONES</NavLink>
          <NavLink to="/tablets" className="nav__link">TABLETS</NavLink>
          <NavLink to="/accessories" className="nav__link">ACCESSORIES</NavLink>
        </nav>
      </div>
      <div className="header__search-container">

        <NavLink to="/favorites" className="header__customer header__customer--favorite">
          {favorite.length > 0 && (
            <div className="counter">{favorite.length}</div>
          )}
        </NavLink>
        <NavLink to="/cart" className="header__customer header__customer--cart">
          {cart.length > 0 && (
            <div className="counter">{cart.length}</div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
