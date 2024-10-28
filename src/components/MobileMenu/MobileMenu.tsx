import React, { useContext } from 'react';
import classNames from 'classnames';

import styles from './MobileMenu.module.scss';
import stylesButton from '../../styles/buttons.module.scss';
import '../../App.scss';

// import { Header } from '../Header';
import { Navigation } from '../Navigation';
import { Link } from 'react-router-dom';
import { CartContext, FavouriteContext } from '../../ContextProvider';

interface Props {
  isMobileMenuOpen: boolean;
}

export const MobileMenu: React.FC<Props> = ({ isMobileMenuOpen }) => {
  const { cartProducts } = useContext(CartContext);
  const { favouriteProducts } = useContext(FavouriteContext);

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
        >
          {!!favouriteProducts.length && (
            <span className="buttonFavouriteWrapper">
              {favouriteProducts.length}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className={classNames(
            stylesButton.buttonCart,
            styles.mobileMenuBottomBtn,
          )}
        >
          {!!cartProducts.length && (
            <span className="buttonCartWrapper">{cartProducts.length}</span>
          )}
        </Link>
      </div>
    </aside>
  );
};
