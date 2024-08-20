import classNames from 'classnames';
import adideStyles from './AsideMenu.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Navbar } from '../../../navbar';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

export const AsideMenu: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <aside
      className={classNames(adideStyles.menu, {
        [adideStyles.shown]: isMenuOpen,
      })}
    >
      <div className={adideStyles.menu__header}>
        <Link to="/" className={adideStyles.menu__header_logo}>
          <img
            className={adideStyles.menu__header_logoimage}
            src="img/icons/main-logo.svg"
            alt="LOGO"
          />
        </Link>

        <div className={adideStyles.menu__header_right}>
          <div
            onClick={() => setIsMenuOpen(false)}
            className={`${adideStyles.menu__header_button} ${adideStyles.menu__header_burger}`}
          >
            <img
              className={adideStyles.menu__header_button_image}
              src="img/icons/close.svg"
              alt="menu"
            />
          </div>
        </div>
      </div>

      <div className={adideStyles.menu__navbar}>
        {isMenuOpen && (
          <Navbar onClick={() => setIsMenuOpen(false)} isOpen={true} />
        )}
      </div>

      <div className={adideStyles.menu__buttons}>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            classNames(adideStyles.menu__button, {
              [adideStyles.menu__itemlink_active]: isActive,
            })
          }
        >
          <img
            className={adideStyles.menu__button_image}
            src="img/icons/favourite.svg"
          />
        </NavLink>

        <NavLink
          to="/basket"
          className={({ isActive }) =>
            classNames(adideStyles.menu__button, {
              [adideStyles.menu__itemlink_active]: isActive,
            })
          }
        >
          <img
            className={adideStyles.menu__button_image}
            src="img/icons/cart.svg"
          />
        </NavLink>
      </div>
    </aside>
  );
};
