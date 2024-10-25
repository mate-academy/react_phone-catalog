import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import './Header.scss';
import { NavIcon } from '../navIcon/NavIcon';
import { useState } from 'react';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { state } = useLocation();
  const [openBurger, setOpenBurger] = useState(false);

  const handleBugreg = () => {
    setOpenBurger(prev => !prev);
  };

  return (
    <div className="header">
      <div className="header__big">
        <div className="header__nav">
          <NavLink to="/" className="header__navLogo">
            <img src={Logo} alt="logo" className="header__logo" />
          </NavLink>
          <div className="header__links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'header__navItem--text header__navItem--active'
                  : 'header__navItem--text'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive && state.category === 'phones'
                  ? 'header__navItem--text header__navItem--active'
                  : 'header__navItem--text'
              }
              state={{ category: 'phones' }}
            >
              Phones
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive && state.category === 'tablets'
                  ? 'header__navItem--text header__navItem--active'
                  : 'header__navItem--text'
              }
              state={{ category: 'tablets' }}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive && state.category === 'accessories'
                  ? 'header__navItem--text header__navItem--active'
                  : 'header__navItem--text'
              }
              state={{ category: 'accessories' }}
            >
              Accessories
            </NavLink>
          </div>
        </div>
        <div className="header__icons">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? 'header__navItem--active' : ''
            }
          >
            <NavIcon type="favorite" />
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'header__navItem--active' : ''
            }
          >
            <NavIcon type="cart" />
          </NavLink>
        </div>
      </div>
      <div className="header__small">
        <NavLink to="/" className="header__navLogo">
          <img src={Logo} alt="logo" className="header__logo" />
        </NavLink>
        <div
          className={classNames('header__burgerButton', {
            'header__burgerButton--active': openBurger,
          })}
          onClick={handleBugreg}
        />
        <div
          className={classNames('header__smallContainer', {
            'header__smallContainer--clicked': openBurger,
          })}
        >
          <div className="header__links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'header__navItem--text header__navItem--active'
                  : 'header__navItem--text'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive && state.category === 'phones'
                  ? 'header__navItem--text header__navItem--active'
                  : 'header__navItem--text'
              }
              state={{ category: 'phones' }}
            >
              Phones
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive && state.category === 'tablets'
                  ? 'header__navItem--text header__navItem--active'
                  : 'header__navItem--text'
              }
              state={{ category: 'tablets' }}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive && state.category === 'accessories'
                  ? 'header__navItem--text header__navItem--active'
                  : 'header__navItem--text'
              }
              state={{ category: 'accessories' }}
            >
              Accessories
            </NavLink>
          </div>
          <div className="header__icons">
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? 'header__navItem--active' : ''
              }
            >
              <NavIcon type="favorite" />
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? 'header__navItem--active' : ''
              }
            >
              <NavIcon type="cart" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
