import classNames from 'classnames';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  text?: string,
  way: string,
  children?: ReactNode,
  classStyle: string
};

export const NavLinkCustom:React.FC<Props> = (
  {
    text, way, children, classStyle, ...props
  },
) => (
  <NavLink
    className={({ isActive }) => {
      return classNames(`${classStyle}`, {
        'active-link': isActive,
      });
    }}
    to={way}
    {...props}
  >
    {children || text}
  </NavLink>
);
