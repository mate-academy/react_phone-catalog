import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import cn from 'classnames';

import { IMenuLink } from './navLinks-items.interface';

import styles from './NavLinks.module.scss';

interface IMenuItem {
  item: IMenuLink;
  idx?: number;
  closeMenu?: () => void;
}

export const NavLinks: FC<IMenuItem> = ({ item, idx = 0, closeMenu }) => {
  return (
    <motion.li
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.1 + idx / 10,
      }}
    >
      <NavLink
        to={item.link}
        className={({ isActive }) => cn(styles.link, isActive && styles.active)}
        onClick={closeMenu}
        title={`Go to to the ${item.name} page`}
        aria-label={item.name}
      >
        {item.name}
      </NavLink>
    </motion.li>
  );
};
