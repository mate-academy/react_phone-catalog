import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  img: string;
  count?: number;
  className: string;
  activeClass?: string;
  countClass?: string;
  onClick?: () => void;
};

export const HeaderIconItem: React.FC<Props> = ({
  to,
  img,
  count,
  className,
  activeClass,
  countClass,
  onClick,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      classNames(className, { [activeClass || '']: isActive })
    }
    onClick={onClick}
  >
    <img src={img} alt="" />
    {count !== undefined && count > 0 && (
      <div className={countClass}>{count}</div>
    )}
  </NavLink>
);
