import './Header.scss';

import logo from '../../assets/icons/Logo.svg';
import { useContext, useState } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../../context/GlobalContext';

export const Header = () => {
  const { favorites, cart } = useContext(GlobalContext);
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <div className="header">
      <div className="header__body">
        <a href="#" className="header__logo">
          <img src={logo} alt="logo" />
        </a>

        <div
          className={classNames('header__wrapper', {
            'is-active': isMenuActive,
          })}
        >
          <nav className="header__menu">
            <ul className="header__list">
              <li>
                <a href="#" className="header__link">
                  home
                </a>
              </li>
              <li>
                <a href="#" className="header__link">
                  phones
                </a>
              </li>
              <li>
                <a href="#" className="header__link">
                  tablets
                </a>
              </li>
              <li>
                <a href="#" className="header__link">
                  accessories
                </a>
              </li>
            </ul>
          </nav>

          <div className="header__buttons">
            <div className="header__btn header__btn--fav">
              {!!favorites.length && (
                <span className="header__value">{favorites.length}</span>
              )}
            </div>
            <div className="header__btn header__btn--cart">
              {!!cart.length && (
                <span className="header__value">{cart.length}</span>
              )}
            </div>
          </div>
        </div>
        <div
          className={classNames('header__burger', {
            'is-active': isMenuActive,
          })}
          onClick={() => {
            document.body.classList.toggle('lock');
            setIsMenuActive(prev => !prev);
          }}
        >
          <div className="header__btn header__btn--burger">
            <div className="header__burger-btn">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
