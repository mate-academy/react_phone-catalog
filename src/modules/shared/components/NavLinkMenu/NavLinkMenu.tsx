/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import scss from './NavLinkMenu.module.scss';
import { useContext } from 'react';
import { DataContext } from '../../../../context/ContextProvider';

const styleMap = {
  text: scss.link,
  icon: scss.iconLink,
} as const satisfies Record<string, string>;

type LinkType = keyof typeof styleMap;
type BaseProps = { to: string; label: string; end?: boolean };
type Props<T extends LinkType = LinkType> = BaseProps &
  (T extends 'icon' ? { type: T; icon: string } : { type: T; icon?: never });

export const NavLinkMenu: React.FC<Props> = ({
  to,
  type,
  label,
  icon,
  end,
}) => {
  const { favItems, cartItems } = useContext(DataContext);
  const countFav = favItems.length;
  const countCart = cartItems.length;
  const showFavBadge = countFav > 0 && icon === 'heart-icon';
  const showCartBadge = countCart > 0 && icon === 'shopping-bag';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(styleMap[type], {
          [scss.link_active]: isActive,
        })
      }
      aria-label={type === 'icon' ? label : undefined}
      end={end}
    >
      {type === 'text' ? (
        label
      ) : (
        <>
          <svg className={scss.iconLink__icon}>
            <use href={`/icons/icons.svg#${icon}`}></use>
          </svg>
          {showFavBadge && (
            <span className={scss.iconLink__counter} aria-hidden="true">
              {countFav}
            </span>
          )}
          {showCartBadge && (
            <span className={scss.iconLink__counter} aria-hidden="true">
              {countCart}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};
