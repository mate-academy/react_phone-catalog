import classNames from 'classnames';
import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  text?: string;
  way: string;
  children?: ReactNode;
  classStyle: string;
  onClick?: () => void;
  active?: boolean;
};

export const NavLinkCustom: React.FC<Props> = ({
  text,
  way,
  children,
  classStyle,
  active,
  ...props
}) => {
  const { search } = useLocation();

  return (
    <NavLink
      style={{ textDecoration: 'none' }}
      className={({ isActive }) => {
        return classNames(`${classStyle}`, {
          'active-link': isActive && !active,
        });
      }}
      to={`${way}${search}`}
      {...props}
    >
      {children || text}
    </NavLink>
  );
};
