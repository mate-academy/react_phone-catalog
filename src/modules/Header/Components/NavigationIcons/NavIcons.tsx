import React, { useContext } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { setIsOpened } from '../../../../app/features/asideMenuSlice';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';
import { UpdatedProduct } from '../../../shared/Types/types';
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
        onClick={() => (isDark ? setIsDark(false) : setIsDark(true))}
        className={classNames('icons__item icons__item--button', {
          'icons__item--is-Dark icons__isDarkMode--button': isDark,
        })}
      />

      {iconsArray.map(item => (
        <NavLink
          key={item}
          className={({ isActive }) => {
            return classNames(`icons__item icons__item--${item}`, {
              'icons__item--active': isActive,
              'icons__item--is-Dark': isDark,
              'icons__item--is-Dark-Favorites':
                isDark && item === iconsArray[0],
              'icons__item--is-Dark-Cart': isDark && item === iconsArray[1],
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
                {
                  'icons__quantity-icon--is-Dark': isDark,
                },
              )}
            >
              {cartNumber}
            </div>
          ) : item === 'favorites' && favoritesNumber > 0 ? (
            <div
              className={classNames(
                `icons__quantity-icon icons__quantity-icon--${item}`,
                {
                  'icons__quantity-icon--is-Dark': isDark,
                },
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
