/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.scss';
import { CartContext } from '../../../contexts/CartContextProvider';
import { FavoriteContext } from '../../../contexts/FavoriteContextProvider';

const navigation = [
  'home',
  'phones',
  'tablets',
  'accessories',
];

type ContextKey = 'favorites' | 'cart';

const navigationAction: ContextKey[] = [
  'favorites',
  'cart',
];

export const Menu: React.FC = () => {
  const classListBody = document.body.classList;
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const handleOpenMenu = () => {
    setIsActiveMenu(true);
    classListBody.add('app-with-menu');
  };

  const handleCloseMenu = () => {
    setIsActiveMenu(false);
    classListBody.remove('app-with-menu');
  };

  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoriteContext);

  const contexts = {
    favorites,
    cart,
  };

  return (
    <div className="menu">
      <button
        type="button"
        className="menu__open"
        onClick={handleOpenMenu}
      />

      <div className={classNames(
        'menu__content',
        { isActive: isActiveMenu },
      )}
      >
        <div className="menu__content--top">
          <button
            type="button"
            className="menu__close"
            onClick={handleCloseMenu}
          />
        </div>

        <ul className="menu__list">
          {navigation.map(currentLink => (
            <li
              key={currentLink}
              className="menu__item"
            >
              <NavLink
                to={currentLink}
                onClick={handleCloseMenu}
                className={({ isActive }) => classNames(
                  'menu__item--link',
                  { 'menu__item--link-active': isActive },
                )}
              >
                {currentLink}
              </NavLink>
            </li>
          ))}

          {navigationAction.map((currentLink: ContextKey) => (
            <li
              key={currentLink}
              className="
                menu__item
                menu__item-action"
            >
              <NavLink
                to={currentLink}
                onClick={handleCloseMenu}
                className={({ isActive }) => classNames(
                  'menu__item--link',
                  { 'menu__item--link-active': isActive },
                )}
              >
                {currentLink}
                {contexts[currentLink as ContextKey].length > 0 && (
                  <div className="menu__item-action-length">
                    {contexts[currentLink as ContextKey].length}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
