import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './navigation.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { FavoritesAndCarts } from '../FavoritesAndCarts';

interface Props {
  isActiveBurger: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export const Navigation: React.FC<Props> = ({
  isActiveBurger,
  setIsActive,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isDesktop = windowWidth >= 768;

  const handleBurgerMenu = () => {
    setIsActive(!isActiveBurger);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setWindowWidth(width);

      if (isDesktop) {
        setIsActive(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsActive, isDesktop]);

  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return cn('nav__link', { 'is-active': isActive });
  };

  return (
    <div className="navigation">
      <div className="navigation__left">
        <div className="logo logo--margin">
          <NavLink className="navigation-logo" to="/home" replace></NavLink>
        </div>

        {isDesktop && (
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink className={getNavClass} to="/home" replace>
                  home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink className={getNavClass} to="/phones">
                  phones
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink className={getNavClass} to="/tablets">
                  tablets
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink className={getNavClass} to="/accessories">
                  accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div className="navigation__right">
        {windowWidth < 768 && (
          <div className="burger-menu">
            <button
              onClick={handleBurgerMenu}
              className={cn('burger-menu__button', {
                'burger-menu__button--close': isActiveBurger,
              })}
            ></button>
          </div>
        )}

        {isDesktop && <FavoritesAndCarts />}
      </div>
    </div>
  );
};
