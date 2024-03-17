import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { HEADER_LIST_ITEMS } from '../../constants/headerListItems';

import { HeaderIconLink } from '../HeaderIconLink';

import './MobileNavMenu.scss';

type Props = {
  setIsOpen: (value: boolean) => void;
  classNames?: string;
  hasItemsInFavourites: boolean;
  hasItemsInCart: boolean;
  favouritesItemsCount: number;
  cartItemsCount: number;
};

export const MobileNavMenu: React.FC<Props> = ({
  setIsOpen,
  classNames,
  hasItemsInFavourites,
  favouritesItemsCount,
  hasItemsInCart,
  cartItemsCount,
}) => {
  return (
    <div
      className={cn('mobile-menu', classNames)}
    >
      <ul className="mobile-menu__nav-list">
        {
          HEADER_LIST_ITEMS.map(el => (
            <li
              className="mobile-menu__nav-item"
              key={el}
            >
              <NavLink
                to={
                  el === HEADER_LIST_ITEMS[0]
                    ? '/'
                    : `/${el}`
                }
                className={({ isActive }) => (
                  cn(
                    'mobile-menu__nav-link',
                    { 'mobile-menu__nav-link--active': isActive },
                  )
                )}
                onClick={() => setIsOpen(false)}
              >
                {el.toUpperCase()}
              </NavLink>
            </li>
          ))
        }
      </ul>

      <div className="mobile-menu__nav-buttons">
        <HeaderIconLink
          iconName="favourites"
          linkTo="favourites"
          hasItemsIn={hasItemsInFavourites}
          count={favouritesItemsCount}
          onClick={() => setIsOpen(false)}
          classNames="mobile-menu__icon"
        />

        <HeaderIconLink
          iconName="shopping"
          linkTo="cart"
          hasItemsIn={hasItemsInCart}
          count={cartItemsCount}
          onClick={() => setIsOpen(false)}
          classNames="mobile-menu__icon"
        />
      </div>
    </div>
  );
};
