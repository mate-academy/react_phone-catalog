import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import cn from 'classnames';
import { motion } from 'framer-motion';

import styles from './NavLinks.module.scss';
import { IMenuLink } from './navLinks-items.interface';

interface IMenuItem {
  item: IMenuLink;
  idx?: number;
  onClick?: () => void;
}

export const NavLinks: FC<IMenuItem> = ({ item, idx = 0, onClick }) => {
  const { t } = useTranslation();
  const localName = t(`nav.${item.name}`);
  const localTitle = t('nav.label', { name: localName });

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
        className={({ isActive }) =>
          cn(styles.link, { [styles.active]: isActive })
        }
        onClick={onClick}
        title={localTitle}
        aria-label={localName}
      >
        {localName}
      </NavLink>
    </motion.li>
  );
};
