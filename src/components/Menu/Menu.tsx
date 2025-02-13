import React from 'react';
import { NavPosition } from '../../types/NavPositionType';
import { Navigation } from '../Navigation';
import styles from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import { Header } from '../Header';
import classNames from 'classnames';
import { ItemsIconCounter } from '../ItemsCounterIcon';

type Props = {
  checkMenu: boolean;
  menuPage: React.Dispatch<React.SetStateAction<boolean>>;
  getLinkClass: (
    { isActive }: { isActive: boolean },
    styles: CSSModuleClasses,
  ) => string;
};

export const Menu: React.FC<Props> = ({
  checkMenu,
  menuPage,
  getLinkClass,
}) => {
  return (
    <aside className={styles.menu} id="menu">
      <Header checkMenu={checkMenu} menuPage={menuPage} />

      <div className={styles.menuNav}>
        <Navigation navPosition={NavPosition.menu} />
      </div>

      <div className={styles.menuFooter}>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            classNames([styles.menuIcon], getLinkClass({ isActive }, styles))
          }
        >
          <div className="counter">
            <ItemsIconCounter icon={'favourites'} />
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(
              [styles.menuIcon],
              [styles.menuRightIcon],
              getLinkClass({ isActive }, styles),
            )
          }
        >
          <div className="counter">
            <ItemsIconCounter icon={'cart'} />
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
