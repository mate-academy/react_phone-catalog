import './Navigation.scss';
import '../icons/icon.scss';
import '../logo/logo.scss';
import { Menu } from '../Menu/Menu';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const getSelectedLink = ({ isActive }: { isActive: boolean }) => {
    return classNames('navigation__link', {
      'navigation__link--is-active': isActive,
    });
  };

  return (
    <>
      <nav className="navigation" id="#navigation">
        <div className="navigation__logo-block">
          <div className="logo__navigation"></div>
        </div>
        <div className="navigation__menu-block">
          <div className="navigation__content">
            <div className="navigation__block-link">
              <NavLink to="/home" className={getSelectedLink}>
                HOME
              </NavLink>
            </div>
            <div className="navigation__block-link">
              {' '}
              <NavLink to="/phones" className={getSelectedLink}>
                PHONES
              </NavLink>
            </div>
            <div className="navigation__block-link">
              {' '}
              <NavLink to="/tablets" className={getSelectedLink}>
                TABLETS
              </NavLink>
            </div>
            <div className="navigation__block-link">
              {' '}
              <NavLink to="/accessories" className={getSelectedLink}>
                ACCESSORIES
              </NavLink>
            </div>
          </div>
          <div className="navigation__icons">
            <a
              className="icon__menu"
              onClick={() => setShowMenu(!showMenu)}
            ></a>
            <div className="navigation__icons-block">
              <div className="navigation__block-bag">
                <a href="" className="icon__navigation-bag"></a>
              </div>
              <div className="navigation__block-heart">
                <Link
                  to="/favourites"
                  className="icon__navigation-heart"
                ></Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
};
