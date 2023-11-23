import { Nav } from '../../Pages/Nav/Nav';
import { Favorites } from '../Favorites/Favorites';
import { Logo } from '../Logo/Logo';
import { QueryFiltering } from '../QueryFiltering/QueryFiltering';

import './Header.scss';

type Props = {
  setIsMenu: (value: boolean) => void,
  isMenu: boolean,
};

export const Header: React.FC<Props> = ({ setIsMenu, isMenu }) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrapper">
          <button
            type="button"
            className="header__menu"
            onClick={() => setIsMenu(!isMenu)}
          >
            <img
              className="header__menu--icon"
              src={
                isMenu
                  ? 'Images/cross-icon.png'
                  : 'Images/menu-icon.png'
              }
              alt="menu icon"
            />
          </button>

          <Logo />
          <Nav />
        </div>

        <div style={{ display: 'flex' }}>
          <QueryFiltering />
          <Favorites />
        </div>
      </div>
    </header>
  );
};
