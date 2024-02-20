/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';

import './Menu.scss';
import { Logo } from '../Logo';

type Props = {
  onClickMenu: () => void;
  isOpenMenu: boolean;
};

export const Menu:React.FC<Props> = ({ onClickMenu, isOpenMenu }) => {
  const classOfMenu = isOpenMenu
    ? 'menu menu--opened'
    : 'menu';

  return (
    <aside className={classOfMenu}>
      <div className="container">
        <div className="menu__content">
          <div className="top-bar top-bar__menu">
            <div className="top-bar__left">
              <button
                type="button"
                className="button-icon button-icon--menu-close"
                onClick={onClickMenu}
              />
            </div>

            <div className="top-bar__right">
              <Logo />
            </div>
          </div>

          <nav className="nav">
            <ul className="nav__list nav__list--menu">
              <li className="nav__item">
                <Link
                  to="/"
                  className="nav__link"
                  onClick={onClickMenu}
                >
                  Home
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  to="/phones"
                  className="nav__link"
                  onClick={onClickMenu}
                >
                  Phones
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/tablets"
                  className="nav__link"
                  onClick={onClickMenu}
                >
                  Tablets
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/accessories"
                  className="nav__link"
                  onClick={onClickMenu}
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};
