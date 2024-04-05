import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { CatalogContext } from '../Contexts/CatalogContext';

type Props = {
  topBar?: boolean;
  aside?: boolean;
  closeAsideAndGoTop?: (flag: boolean) => void;
};

export const Nav: React.FC<Props> = ({
  topBar = false,
  aside = false,
  closeAsideAndGoTop = () => {},
}) => {
  const { favourites, cart } = useContext(CatalogContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const totalCount = useMemo(() => {
    return cart.reduce((sum, currentValue) => sum + currentValue.quantity, 0);
  }, [cart]);

  return (
    <nav
      className={classNames('nav', {
        'nav--top-bar': topBar,
        'nav--aside': aside,
      })}
    >
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            onClick={() => closeAsideAndGoTop(true)}
            className={({ isActive }) =>
              classNames('nav__link', {
                'nav__link--active': isActive,
              })
            }
            to=""
          >
            home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            onClick={() => closeAsideAndGoTop(true)}
            className={({ isActive }) =>
              classNames('nav__link', {
                'nav__link--active': isActive,
              })
            }
            to="/phones"
          >
            Phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            onClick={() => closeAsideAndGoTop(true)}
            className={({ isActive }) =>
              classNames('nav__link', {
                'nav__link--active': isActive,
              })
            }
            to="/tablets"
          >
            tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            onClick={() => closeAsideAndGoTop(true)}
            className={({ isActive }) =>
              classNames('nav__link', {
                'nav__link--active': isActive,
              })
            }
            to="/accessories"
          >
            accessories
          </NavLink>
        </li>
      </ul>
      <div className="nav__right">
        <div
          className={classNames('nav__wrapper', {
            'nav__wrapper--bottom': aside,
          })}
        >
          <Link
            onClick={() => closeAsideAndGoTop(true)}
            to="/favourites"
            className="nav__icon"
          >
            <img
              className="nav__image"
              src="/img/icons/favourites.png"
              alt="favourites"
            />
            {!!favourites.length && (
              <div className="nav__count">
                <p className="nav__count__text">{favourites.length}</p>
              </div>
            )}
          </Link>
        </div>
        <div
          className={classNames('nav__wrapper', {
            'nav__wrapper--bottom': aside,
          })}
        >
          <Link
            onClick={() => closeAsideAndGoTop(true)}
            to="/cart"
            state={{
              search: searchParams.toString(),
              location,
            }}
            className="nav__icon"
          >
            <img className="nav__image" src="/img/icons/cart.png" alt="cart" />
            {!!cart.length && (
              <div className="nav__count">
                <p className="nav__count__text">{totalCount}</p>
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
