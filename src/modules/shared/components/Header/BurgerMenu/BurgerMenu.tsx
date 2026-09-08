import React, { useEffect, useState } from 'react';
import styles from './BurgerMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../../constants/navLinks';
import { Icon } from '../../Icon/Icon';
import { icons } from '../../../constants/icons';
import classNames from 'classnames';

export const BurgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(prev => !prev);
  const handleClose = () => setOpen(false);

  const getActiveItem = ({ isActive }: { isActive: boolean }) =>
    classNames(styles['burger-menu__item'], { active: isActive });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className={styles['burger-menu']}>
      <button
        className={styles['burger-menu__button']}
        onClick={handleToggle}
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        <Icon icon={open ? icons.close : icons.menu} />
      </button>

      <nav
        className={classNames(styles['burger-menu__nav'], {
          [styles['burger-menu__nav--open']]: open,
        })}
      >
        <div className={styles['burger-menu__list']}>
          {navLinks.map(link => (
            <NavLink
              to={link.path}
              key={link.title}
              className={getActiveItem}
              onClick={handleClose}
            >
              {link.title}
            </NavLink>
          ))}
        </div>

        {open && (
          <div className={styles['burger-menu__bottom']}>
            <NavLink
              className={styles['burger-menu__icon']}
              to="/favorites"
              onClick={handleClose}
            >
              <div className={styles['burger-menu__icon-wrapper']}>
                <Icon icon={icons.favorites} />
              </div>
            </NavLink>
            <NavLink
              className={styles['burger-menu__icon']}
              to="/cart"
              onClick={handleClose}
            >
              <div className={styles['burger-menu__icon-wrapper']}>
                <Icon icon={icons.shopping_cart} />
              </div>
            </NavLink>
          </div>
        )}

        {open && (
          <div
            className={styles['burger-menu__overlay']}
            onClick={handleClose}
            aria-hidden="true"
          />
        )}
      </nav>
    </div>
  );
};
