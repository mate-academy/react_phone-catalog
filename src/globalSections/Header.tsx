import classNames from 'classnames';
import {
  Link, NavLink, Route, Routes,
} from 'react-router-dom';
import { CartIcon } from 'components/Icons/CartIcon';
import { HeartIcon } from 'components/Icons/HeartIcon';
import { LogoIcon } from 'components/Icons/LogoIcon';
import { InputSearch } from 'components/InputSearch';
import { PageLink } from 'components/PageLink';
import { FC } from 'react';

type Props = {
  scrollToRef: React.MutableRefObject<null>,
};

export const Header: FC<Props> = ({ scrollToRef }) => {
  return (
    <div className="header" ref={scrollToRef}>
      <div className="header__nav header__nav-left">
        <div className="header__logo logo">
          <Link to="/">
            <LogoIcon />
          </Link>
        </div>

        <ul className="header__list">
          <li className="header__item">
            <PageLink to="/" text="Home" />
          </li>
          <li className="header__item">
            <PageLink to="/phones" text="Phones" />
          </li>
          <li className="header__item">
            <PageLink to="/tablets" text="Tablets" />
          </li>
          <li className="header__item">
            <PageLink to="/accessories" text="Accessories" />
          </li>
        </ul>
      </div>

      <div className="header__nav header__nav-right">
        <Routes>
          <Route path="/phones" element={<InputSearch />} />
          <Route path="/tablets" element={<InputSearch />} />
          <Route path="/accessories" element={<InputSearch />} />
        </Routes>

        <NavLink
          className={({ isActive }) => classNames(
            'header__favourites',
            { 'is-header-link-active': isActive },
          )}
          to="/favourites"
        >
          <div className="header__favourites__link">
            <HeartIcon />
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) => classNames(
            'header__cart',
            { 'is-header-link-active': isActive },
          )}
          to="/cart"
        >
          <div className="header__cart__link">
            <CartIcon />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
