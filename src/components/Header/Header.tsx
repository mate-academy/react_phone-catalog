import './Header.scss';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isMenuOpened = pathname === '/menu';

  const handleMenuClick = () => {
    if (pathname === '/menu') {
      navigate(-1);
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar__container">
          <Link to="/" className="top-bar__logo">
            <img src="./img/logo.svg" alt="Logo" />
          </Link>
          <nav className="top-bar__links">
            <NavLink to="/" className="top-bar__link">
              Home
            </NavLink>
            <NavLink to="/phones" className="top-bar__link">
              Phones
            </NavLink>
            <NavLink to="/tablets" className="top-bar__link">
              Tablets
            </NavLink>
            <NavLink to="/accessories" className="top-bar__link">
              Accessories
            </NavLink>
          </nav>
          <nav className="top-bar__icons">
            <NavLink
              to="/favorites"
              className="icon icon--favourites"
            ></NavLink>
            <NavLink to="/cart" className="icon icon--cart"></NavLink>
          </nav>
          <div className="top-bar__menu">
            {isMenuOpened ? (
              <NavLink
                to="/"
                className="icon icon--close"
                onClick={handleMenuClick}
              ></NavLink>
            ) : (
              <NavLink to="/menu" className="icon icon--menu"></NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
