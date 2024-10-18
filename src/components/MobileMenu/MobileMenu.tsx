import React from 'react';
import classNames from 'classnames';

import styles from './MobileMenu.module.scss';
import stylesButton from '../../styles/buttons.module.scss';

// import { Header } from '../Header';
import { Navigation } from '../Navigation';
import { Link } from 'react-router-dom';

interface Props {
  isMobileMenuOpen: boolean;
}

export const MobileMenu: React.FC<Props> = ({ isMobileMenuOpen }) => {
  return (
    <aside
      className={classNames(styles.mobileMenuContainer, {
        [styles.mobileMenuContainerVisible]: isMobileMenuOpen,
      })}
    >
      <Navigation />

      <div className={styles.mobileMenuBottom}>
        <Link
          to="/favourites"
          className={classNames(
            stylesButton.buttonFavourite,
            styles.mobileMenuBottomBtn,
          )}
        ></Link>
        <Link
          to="/cart"
          className={classNames(
            stylesButton.buttonCart,
            styles.mobileMenuBottomBtn,
          )}
        ></Link>
      </div>
    </aside>
  );
};
