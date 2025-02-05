import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import styles from './Buttons.module.scss';

import { getActiveLink } from '../../utils/getActiveLink';

export const Buttons = () => {
  const handleClassName = (isActive: NavLinkRenderProps, selector: string) => {
    return (
      getActiveLink({ isActive, element: 'button__link', styles }) + selector
    );
  };

  return (
    <ul className={styles.buttons}>
      <li className={`${styles.button} ${styles['button--desktop']}`}>
        <NavLink
          to="favourites"
          className={isActive =>
            handleClassName(isActive, ` ${styles['button__link--favourites']}`)
          }
        ></NavLink>
      </li>

      <li className={`${styles.button} ${styles['button--desktop']}`}>
        <NavLink
          to="cart"
          className={isActive =>
            handleClassName(isActive, ` ${styles['button__link--cart']}`)
          }
        ></NavLink>
      </li>

      <li className={`${styles.button} ${styles['button--mobile']}`}>
        <NavLink
          to="menu"
          className={isActive =>
            handleClassName(isActive, ` ${styles['button__link--menu']}`)
          }
        ></NavLink>
      </li>
    </ul>
  );
};
