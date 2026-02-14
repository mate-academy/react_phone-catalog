import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from '../../Provider/GadgetsContext';

import classNames from 'classnames';

import { HeartIcon } from '../../shared/components/Icons/HeartIcon';
import { CartIcon } from '../../shared/components/Icons/CartIcon';
import { BadgeCounter } from '../../shared/components/Icons/BadgeCounter';

import styles from './NavIcon.module.scss';

type Props = {
  icon: 'heart' | 'cart';
  link: 'favourites' | 'cart';
};

const getClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.nav__icon, { [styles['is-active']]: isActive });
};

export const NavIcon: React.FC<Props> = ({ icon, link }) => {
  const { favourites, cart } = useContext(StateContext);
  const count = icon === 'heart' ? favourites.length : cart.length;

  return (
    <NavLink to={link} className={getClassName}>
      {icon === 'heart' && <HeartIcon className={styles.icon__wrapper} />}
      {icon === 'cart' && <CartIcon className={styles.icon__wrapper} />}
      {count > 0 && <BadgeCounter count={count} />}
    </NavLink>
  );
};
