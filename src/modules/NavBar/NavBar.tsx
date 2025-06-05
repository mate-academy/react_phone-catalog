import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { Gargets } from '../../interface/Gargets';
import { useEffect, useState } from 'react';
interface Props {
  isMobile: boolean;
  links: string[];
  setClickOnLogoBar: React.Dispatch<React.SetStateAction<boolean>>;
  clickOnLogoBar: boolean;
  cartItems: Gargets[];
  favoriteItems: Gargets[];
}
export const NavBar: React.FC<Props> = ({
  isMobile,
  links,
  setClickOnLogoBar,
  clickOnLogoBar,
  cartItems,
  favoriteItems,
}) => {
  const [isActive, setIsActive] = useState(false);
  const cartCount = cartItems.length;
  const favoriteCount = favoriteItems.length;
  const location = useLocation();

  useEffect(() => {
    setIsActive(
      location.pathname.includes(`/cart`) ||
        location.pathname.includes(`/favorites`),
    );
  }, [location]);

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <ul className="navbar__brand">
        <NavLink
          className="navbar__link__logo"
          to={isMobile ? '/' : '/Menu'}
          onClick={e => {
            if (isMobile) {
              e.preventDefault();
            }
          }}
        >
          <img src="./img/navbar/Logo.png" alt="logo-gadgets" />
        </NavLink>
        {links.map((item, index) => (
          <li className="navbar__item" key={index}>
            <NavLink
              // eslint-disable-next-line @typescript-eslint/no-shadow
              className={({ isActive }) =>
                classNames('navbar__link', {
                  'has-background-grey-lighter': isActive,
                })
              }
              to={item === 'home' ? '/' : `/${item}`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="navbar__right">
        {['favorites', 'cart'].map(route => {
          const isCart = route === 'cart';
          const isFavorite = route === 'favorites';
          const isActiveLink =
            isActive && location.pathname.includes(`/${route}`);

          return (
            <button
              key={route}
              className={classNames('navbar__button', {
                hidden: !isMobile || clickOnLogoBar,
                'has-background-grey-lighter': isActiveLink,
                // active: isActive,
              })}
            >
              <NavLink
                aria-current="page"
                className={`navbar__icon__${isCart ? 'cart' : 'like'}`}
                to={`/${route}`}
              >
                {isCart && cartItems.length > 0 && (
                  <span className="navbar__badge">{cartCount}</span>
                )}
                {isFavorite && favoriteItems.length > 0 && (
                  <span className="navbar__badge">{favoriteCount}</span>
                )}
              </NavLink>
            </button>
          );
        })}
      </div>
      <div className="navbar__burger">
        {isMobile && (
          <button
            className="navbar__button-burger"
            onClick={() => setClickOnLogoBar()}
          >
            <NavLink
              className={
                clickOnLogoBar ? 'navbar__icon__close' : 'navbar__icon__menu'
              }
              to="/"
            />
          </button>
        )}
      </div>
    </nav>
  );
};
