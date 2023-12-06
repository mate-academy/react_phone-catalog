import { useEffect, useState } from 'react';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { Product } from '../../helpers/Product';
import './HeaderStyles.scss';
import { Search } from '../Search/Search';

import { isActiveTab, isActiveAdd, isActiveLike } from '../../helpers/utils';

type Props = {
  likeProduct: Product[],
  addProduct: Product[],
};

export const HeaderOnPage: React.FC<Props> = ({ likeProduct, addProduct }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 745);

  const { pathname } = useLocation();

  const path = ['/phones', '/tablets', '/accessories'];

  const showSearch = path.includes(pathname);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 650);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleIconClick = () => {
    if (pathname === '/addPage' || pathname === '/favourites') {
      navigate('/menu');
    } else {
      window.history.back();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <NavLink
          to="/"
          className="header__img"
        />

        {!isSmallScreen && (
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink to="/" className={isActiveTab}>
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/phones" className={isActiveTab}>
                  Phones
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/tablets" className={isActiveTab}>
                  Tablets
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/accessories" className={isActiveTab}>
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div className="header__buttons">
        {showSearch ? <Search /> : null}

        {isSmallScreen && (
          <NavLink
            to="menu"
            onClick={handleIconClick}
            className="header__chose nav__burger"
          />
        )}

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
