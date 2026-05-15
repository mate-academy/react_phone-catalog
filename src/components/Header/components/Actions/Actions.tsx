import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Actions.module.scss';
import { Icon } from '../../../Icon';
import React from 'react';

interface Props {
  cartCount: number;
  favCount: number;
  onClose?: () => void;
  className?: string;
}

export const Actions: React.FC<Props> = ({ cartCount, favCount, onClose, className }) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.nav__link, {
      [styles.nav__link_active]: isActive,
    });
  };

  return (
    <div className={classNames(styles.actions, className)}>
      <NavLink
        to="/favorites"
        className={props => classNames(getNavLinkClass(props), styles.action)}
        onClick={onClose}
      >
        <Icon variant="heart" count={favCount} />
      </NavLink>
      <NavLink
        to="/cart"
        className={props => classNames(getNavLinkClass(props), styles.action)}
        onClick={onClose}
      >
        <Icon variant="shopping-bag" count={cartCount} />
      </NavLink>
    </div>
  );
};
