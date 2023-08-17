import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { SearchBar } from './SearchBar';
import { selectedList } from '../helpers/cartTab';
import { favList } from '../helpers/favoriteTab';

const linkClassNames = (
  { isActive } : { isActive : boolean },
) => classNames('header__link text__uppercase', { active: isActive });

const iconClassNames = (
  { isActive } : { isActive : boolean },
) => classNames('header__icon', { active: isActive });

export const Header:React.FC = () => {
  const { pathname } = useLocation();
  const searchBarIsPresent
    = pathname === '/phones' || pathname === '/favorites';
  const cartIsActive = pathname === '/cart';

  const [clickCounter, setClickCounter] = useState<number>(0);
  const [cartLength, setCartLength] = useState<number>(0);
  const [favLength, setFavLength] = useState<number>(0);

  useEffect(() => {
    setCartLength(selectedList.length);
    setFavLength(favList.length);
  }, [clickCounter]);

  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLButtonElement;

    if (target.classList.contains('favorite-button')
      || target.classList.contains('button')
      || target.classList.contains('cart-item__left-part__name')) {
      setClickCounter(prev => prev + 1);
    }
  });

  return (
    <header className="header">
      <div className="header__left">
        {cartIsActive ? (
          <NavLink className="logo" to="/" />
        ) : (
          <>
            <NavLink className="logo" to="/" />
            <NavLink className={linkClassNames} to="/">
              home
            </NavLink>
            <NavLink className={linkClassNames} to="/phones">
              phones
            </NavLink>
            <NavLink className={linkClassNames} to="/tablets">
              tablets
            </NavLink>
            <NavLink className={linkClassNames} to="/accessories">
              accessories
            </NavLink>
          </>
        )}
      </div>

      <div className="header__right">
        {searchBarIsPresent && (
          <SearchBar category={pathname.slice(1)} />
        )}

        {!cartIsActive && (
          <NavLink className={iconClassNames} to="/favorites">
            <div className="header__icon">
              <div className="header__icon__cover">
                <div className="icon icon--favorites header__icon__image" />
                {favLength > 0 && (
                  <span className="header__icon__amount">
                    {favLength}
                  </span>
                )}
              </div>
            </div>
          </NavLink>
        )}
        <NavLink className={iconClassNames} to="/cart">
          <div className="header__icon">
            <div className="header__icon__cover">
              <div className="icon icon--cart header__icon__image" />
              {cartLength > 0 && (
                <span className="header__icon__amount">
                  {cartIsActive ? '' : cartLength}
                </span>
              )}
            </div>
          </div>
        </NavLink>
      </div>
    </header>
  );
};
