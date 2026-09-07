import classNames from 'classnames';
import React, { useCallback, useRef } from 'react';
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
  const isActiveRef = useRef(false);

  const getLinkClass = useCallback(
    ({ isActive }: { isActive: boolean }): string => {
      isActiveRef.current = isActive;

      return classNames(props.className, styles['nav-link-item'], {
        [styles['nav-link-item--active']]: isActive,
        [styles['nav-link-item--fixed-padding']]: fixedPadding,
      });
    },
    [fixedPadding, props.className],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isActiveRef.current) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (props.onClick) {
        props.onClick(e);
      }
    },
    [props],
  );

  return (
    <NavLink {...props} className={getLinkClass} onClick={handleClick}>
      {children}
    </NavLink>
  );
};
