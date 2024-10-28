import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LinkItem.module.scss';

type Props = {
  type: 'btn' | 'link';
  path: string;
  onClick?: () => void;
  children: React.ReactNode;
};

function getClassLink({ isActive }: { isActive: boolean }) {
  return classNames(styles.LinkItem, styles.LinkItem_link, {
    [styles.LinkItem_active]: isActive,
  });
}

function getClassBtn({ isActive }: { isActive: boolean }) {
  return classNames(styles.LinkItem, styles.LinkItem_btn, {
    [styles.LinkItem_active]: isActive,
  });
}

export const LinkItem: React.FC<Props> = ({
  type,
  path,
  onClick = () => {},
  children,
}) => {
  return (
    <NavLink
      to={path}
      className={type === 'link' ? getClassLink : getClassBtn}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};
