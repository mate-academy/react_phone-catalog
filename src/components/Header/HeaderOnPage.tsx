import { useEffect } from 'react';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import classNames from 'classnames';
import { Product } from '../../helpers/Product';
import './HeaderStyles.scss';
import { Search } from '../Search/Search';

type Props = {
  likeProduct: Product[],
  addProduct: Product[],
};

export const HeaderOnPage: React.FC<Props> = ({ likeProduct, addProduct }) => {
  const isActiveTab = ({ isActive }: { isActive: boolean }) => classNames(
    'nav__link', { nav__active: isActive },
  );

  const isActiveLike = ({ isActive }: { isActive: boolean }) => classNames(
    'header__like', 'header__chose', { nav__active: isActive },
  );

  const isActiveAdd = ({ isActive }: { isActive: boolean }) => classNames(
    'header__add', 'header__chose', { nav__active: isActive },
  );

  const { pathname } = useLocation();

  const path = ['/phones', '/tablets', '/accessories'];

  const showSearch = path.includes(pathname);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <header className="header">
      <div className="container">
        <a
          href="/"
          className="header__img"
        />
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                to="/"
                className={isActiveTab}
              >
                Home
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to="/phones"
                className={isActiveTab}
              >
                Phones
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to="/tablets"
                className={isActiveTab}
              >
                Tablets
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to="/accessories"
                className={isActiveTab}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__buttons">
        {showSearch ? <Search /> : null}

        <NavLink to="favourites" className={isActiveLike}>
          {likeProduct.length !== 0 && (
            <div className="header__amount">
              {likeProduct.length}
            </div>
          )}
        </NavLink>

        <NavLink to="addPage" className={isActiveAdd}>
          {addProduct.length !== 0 && (
            <div className="header__amount">
              {addProduct.length}
            </div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
