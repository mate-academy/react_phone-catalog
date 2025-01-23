import classNames from 'classnames';
import React, { useCallback } from 'react';
import { NavLinkProps, NavLink } from 'react-router-dom';

import styles from './NavLinkItem.module.scss';

type Props = {
  fixedPadding?: boolean;
} & NavLinkProps;

export const NavLinkItem: React.FC<Props> = ({
  children,
  fixedPadding,
  ...props
}) => {
  const getLinkClass = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      classNames(styles['nav-link-item'], {
        [styles['nav-link-item--active']]: isActive,
        [styles['nav-link-item--fixed-padding']]: fixedPadding,
      }),
    [fixedPadding],
  );

  return (
    <NavLink {...props} className={getLinkClass}>
      {children}
    </NavLink>
  );
};
