import './Navigation.scss';
import '../icons/icon.scss';
import '../logo/logo.scss';
import { Menu } from '../Menu/Menu';
import { useState } from 'react';

export const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className="navigation">
        <div className="navigation__logo-block">
          <div className="logo__navigation"></div>
        </div>
        <div className="navigation__menu-block">
          <div className="icon">
            <a
              className="icon__menu"
              onClick={() => setShowMenu(!showMenu)}
            ></a>
          </div>
        </div>
      </nav>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
};
