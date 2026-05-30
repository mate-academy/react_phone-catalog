import { Link, useLocation } from 'react-router-dom';
import './BurgerMenu.scss';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const BurgerMenu: React.FC<Props> = ({ menuOpen, setMenuOpen }) => {
  const { pathname } = useLocation();

  const handleClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className={`menu ${menuOpen ? 'menu-open' : ''}`}>
      <div className="menu__links">
        <Link
          to="/"
          className={`menu__links--item ${pathname === '/' ? 'burger-active' : ''}`}
          onClick={handleClick}
        >
          home
        </Link>
        <Link
          to="/phones"
          className={`menu__links--item ${pathname === '/phones' ? 'burger-active' : ''}`}
          onClick={handleClick}
        >
          phones
        </Link>
        <Link
          to="/tablets"
          className={`menu__links--item ${pathname === '/tablets' ? 'burger-active' : ''}`}
          onClick={handleClick}
        >
          tablets
        </Link>
        <Link
          to="/accessories"
          className={`menu__links--item ${pathname === '/accessories' ? 'burger-active' : ''}`}
          onClick={handleClick}
        >
          accessories
        </Link>
      </div>
      <div className="menu__trinkets">
        <Link
          to="/favourites"
          className={`menu__trinkets--heart ${pathname === '/favourites' ? 'heart-active' : ''}`}
          onClick={handleClick}
        ></Link>
        <Link
          to="/basket"
          className="menu__trinkets--basket"
          onClick={handleClick}
        ></Link>
      </div>
    </div>
  );
};
