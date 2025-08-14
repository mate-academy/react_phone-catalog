/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import scss from './NavLinkMenu.module.scss';

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
        <svg className={scss.iconLink__icon}>
          <use href={`/icons/icons.svg#${icon}`}></use>
        </svg>
      )}
    </NavLink>
  );
};
