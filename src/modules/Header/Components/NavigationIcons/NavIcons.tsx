import React, { useContext } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { setIsOpened } from '../../../../app/features/asideMenuSlice';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';
import { ThemeModeKeys, UpdatedProduct } from '../../../shared/Types/types';
import { FavouritesContext } from '../../../../Store/FavouritesStore';
import { CartStoreContext } from '../../../../Store/CartStore';

export const NavIcons: React.FC = () => {
  const iconsArray = ['favorites', 'cart'];
  const dispatch = useAppDispatch();
  const { isDark, setIsDark } = useContext(DarkModeContext);
  const { favourites } = useContext(FavouritesContext);
  const { cartList } = useContext(CartStoreContext);

  const favoritesNumber = favourites.length;
  const cartNumber = cartList.reduce(
    (acc, cur: UpdatedProduct) => acc + cur.quantity,
    0,
  );

  return (
    <div className="icons">
      <button
        onClick={() =>
          isDark === ThemeModeKeys.isDark
            ? setIsDark(ThemeModeKeys.isLight)
            : setIsDark(ThemeModeKeys.isDark)
        }
        className={classNames('icons__item icons__item--button', {
          'icons__isDarkMode--button': isDark === ThemeModeKeys.isDark,
        })}
      />

      {iconsArray.map(item => (
        <NavLink
          key={item}
          className={({ isActive }) => {
            return classNames(`icons__item icons__item--${item}`, {
              'icons__item--active': isActive,
            });
          }}
          to={`${item}`}
          onClick={() => {
            dispatch(setIsOpened(false));
          }}
        >
          {item === 'cart' && cartNumber > 0 ? (
            <div
              className={classNames(
                `icons__quantity-icon icons__quantity-icon--${item}`,
              )}
            >
              {cartNumber}
            </div>
          ) : item === 'favorites' && favoritesNumber > 0 ? (
            <div
              className={classNames(
                `icons__quantity-icon icons__quantity-icon--${item}`,
              )}
            >
              {favoritesNumber}
            </div>
          ) : null}
        </NavLink>
      ))}
    </div>
  );
};
