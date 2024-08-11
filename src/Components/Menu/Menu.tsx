import './menu.scss';
import '../icons/icon.scss';
import classNames from 'classnames';

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
        <a href="" className="menu__link">
          HOME
        </a>
        <a href="" className="menu__link">
          PHONES
        </a>
        <a href="" className="menu__link">
          TABLETS
        </a>
        <a href="" className="menu__link">
          ACCESSORIES
        </a>
      </nav>
      <footer className="menu__footer">
        <div className="menu__footer-block menu__footer-block--line">
          <a className="icon__menu-heart"></a>
        </div>
        <div className="menu__footer-block">
          <a className="icon__menu-bag"></a>
        </div>
      </footer>
    </menu>
  );
};
