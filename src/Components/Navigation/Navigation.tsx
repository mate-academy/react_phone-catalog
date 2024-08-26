import './Navigation.scss';
import '../icons/icon.scss';
import '../logo/logo.scss';
import { Menu } from '../Menu/Menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className="navigation" id="#navigation">
        <div className="navigation__logo-block">
          <div className="logo__navigation"></div>
        </div>
        <div className="navigation__menu-block">
          <div className="navigation__content">
            <div className="navigation__block-link">
              <Link to="/home" className="navigation__link">
                HOME
              </Link>
            </div>
            <div className="navigation__block-link">
              {' '}
              <Link to="/phones" className="navigation__link">
                PHONES
              </Link>
            </div>
            <div className="navigation__block-link">
              {' '}
              <Link to="/tablets" className="navigation__link">
                TABLETS
              </Link>
            </div>
            <div className="navigation__block-link">
              {' '}
              <Link to="/accessories" className="navigation__link">
                ACCESSORIES
              </Link>
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
                <a href="" className="icon__navigation-heart"></a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
};
