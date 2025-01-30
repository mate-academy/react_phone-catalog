import { NavLink } from 'react-router-dom';
import cl from './Icon.module.scss';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setIsMenuOpened } from '../../../features/globalSlice';

export enum IconType {
  FAV = 'fav',
  CART = 'cart',
  BURGER = 'burger',
  CLOSE = 'close',
}

type RouteMap = {
  [key in IconType]: string;
};

const routes: RouteMap = {
  fav: '/favorites',
  cart: '/cart',
  burger: '/',
  close: '/',
};

export enum IconOrigin {
  ONMENU = 'onMenu',
  ONHEADER = 'onHeader',
}

type Props = {
  type: IconType;
  origin: IconOrigin;
  className?: string;
};
export const Icon: React.FC<Props> = ({ type, className, origin }) => {
  const dispatch = useAppDispatch();
  const { favoritesList, cartList, totalItemsInCart } = useAppSelector(
    st => st.products,
  );

  // we don't need these icons to be links
  if (type === IconType.BURGER || type === IconType.CLOSE) {
    return (
      <button
        className={cn(`${cl.iconLink} ${className}`)}
        // if icon is burger button opens menu, otherwise closes. Change of this state toggles menu
        onClick={() => dispatch(setIsMenuOpened(type === IconType.BURGER))}
      >
        <div className={`${cl[type]}`}></div>
      </button>
    );
  }

  return (
    <NavLink
      to={routes[type]}
      className={({ isActive }) =>
        cn(`${cl.iconLink} ${className}`, {
          /* yeah, this looks kinda gross, but i did this classing to remove left border when using
        the same Fav icon on menu */
          [cl.removeBorderLeft]:
            type === IconType.FAV && origin === IconOrigin.ONMENU,
          // icons should have diff size and appear on menu
          [cl.displayOnMenu]: origin === IconOrigin.ONMENU,
          [cl.isActive]: isActive,
        })
      }
    >
      {/* classname sets background image */}
      <div className={`${cl[type]}`}>
        {/* red circle near the icon resembling how much item correspondign list has */}
        {type === IconType.FAV && favoritesList.length > 0 && (
          <span className={cl.listInfo}>{favoritesList.length}</span>
        )}
        {type === IconType.CART && cartList.length > 0 && (
          <span className={cl.listInfo}>{totalItemsInCart}</span>
        )}
      </div>
    </NavLink>
  );
};
