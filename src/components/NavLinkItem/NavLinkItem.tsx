import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavLinkItem.module.scss';
import { useMenu } from '../../hooks/useMenu';

type Props = {
  path: string;
  text: string;
};

const isActiveLink = (baseClass: string, isActive: boolean) => {
  return cn(baseClass, 'link', { 'is-active': isActive });
};

export const NavLinkItem: React.FC<Props> = ({ path, text }) => {
  const { isOpen, closeMenu } = useMenu();

  return (
    <NavLink
      to={path}
      className={({ isActive }) => isActiveLink(styles['nav-link'], isActive)}
      onClick={() => {
        if (isOpen) {
          closeMenu();
        }
      }}
    >
      {text}
    </NavLink>
  );
};
