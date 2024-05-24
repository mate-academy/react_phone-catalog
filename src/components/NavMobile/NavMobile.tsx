/* eslint-disable import/no-extraneous-dependencies */
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Hamburger from 'hamburger-react';
import { useClickAway } from 'react-use';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import { Favorites } from '../Favorites';
import { Cart } from '../Cart';
import { Logo } from '../Logo';
import { PAGES } from '../../constants/pages';

import classes from './NavMobile.module.scss';

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  const activeClass = ({ isActive }: { isActive: boolean }) => {
    return classNames([classes.NavMobile__item], {
      [classes.active]: isActive,
    });
  };

  return (
    <>
      <div className={classes.NavMobile}>
        <Hamburger toggled={isOpen} size={10} toggle={setOpen} />
      </div>

      {isOpen && (
        <motion.aside
          className={classes.NavMobile__menu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className={classes.NavMobile__top}>
            <Logo onClick={() => setOpen(false)} />
            <div className={classes['NavMobile__menu-button']}>
              <Hamburger toggled={isOpen} size={10} toggle={setOpen} />
            </div>
          </div>

          <div className={classes.NavMobile__navigation}>
            {PAGES.map(page => (
              <NavLink
                to={`/${page === 'home' ? '' : page}`}
                key={page}
                className={activeClass}
                onClick={() => setOpen(false)}
              >
                {page}
              </NavLink>
            ))}
          </div>

          <div className={classes.NavMobile__bottom}>
            <div className={classes.NavMobile__favorites}>
              <Favorites onClick={() => setOpen(false)} />
            </div>
            <Cart onClick={() => setOpen(false)} />
          </div>
        </motion.aside>
      )}
    </>
  );
};
