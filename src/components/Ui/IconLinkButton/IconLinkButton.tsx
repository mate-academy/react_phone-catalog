import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './IconLinkButton.module.scss';

interface Props {
  to: string;
  src: string;
  label?: string;
  className?: string;
  onClick?: () => void;
  toggled?: boolean;
  toggledSrc?: string;
}

const cx = classNames.bind(styles);

export const IconLinkButton: React.FC<Props> = ({
  to,
  src,
  label,
  className,
  onClick,
  toggled = false,
  toggledSrc,
}) => {
  return (
    <NavLink
      to={to}
      aria-label={label}
      title={label}
      onClick={onClick}
      className={({ isActive }) =>
        cx('icon-link', { 'icon-link--active': isActive }, className)
      }
    >
      <img
        src={toggled && toggledSrc ? toggledSrc : src}
        alt=""
        className={cx('icon-link__icon')}
      />
    </NavLink>
  );
};
