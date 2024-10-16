import './menu.scss';
import '../icons/icon.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
};

export const Menu = ({ showMenu, setShowMenu }: Props) => {
  return (
    <menu className={classNames('menu', { 'menu--show-menu': showMenu })}>
      <div className="menu__header">
        <div className="menu__logo-block">
          <div className="logo__menu"></div>
        </div>
        <div className="menu__block-with-cross">
          <a
            className="icon__menu-cross"
            onClick={() => setShowMenu(false)}
          ></a>
        </div>
      </div>
      <nav className="menu__navigation">
        <Link to="/home" className="menu__link">
          HOME
        </Link>
        <Link to="/phones" className="menu__link">
          PHONES
        </Link>
        <Link to="/tablets" className="menu__link">
          TABLETS
        </Link>
        <Link to="/accessories" className="menu__link">
          ACCESSORIES
        </Link>
      </nav>
      <footer className="menu__footer">
        <div className="menu__footer-block menu__footer-block--line">
          <Link to="/favourites" className="icon__menu-heart"></Link>
        </div>
        <div className="menu__footer-block">
          <Link to="/cart" className="icon__menu-bag"></Link>
        </div>
      </footer>
    </menu>
  );
};
