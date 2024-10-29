import React, { useContext } from 'react';
import classNames from 'classnames';

import styles from './MobileMenu.module.scss';
import '../../App.scss';
import { Navigation } from '../Navigation';
import { Link } from 'react-router-dom';
import { CartContext, FavouriteContext } from '../../ContextProvider';

interface Props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const MobileMenu: React.FC<Props> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const { cartProducts } = useContext(CartContext);
  const { favouriteProducts } = useContext(FavouriteContext);

  return (
    <aside
      className={classNames(styles.mobileMenuContainer, {
        [styles.mobileMenuContainerVisible]: isMobileMenuOpen,
      })}
    >
      <Navigation
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className={styles.mobileMenuBottom}>
        <Link
          to="/favourites"
          className={classNames('buttonFavourite', styles.mobileMenuBottomBtn)}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {!!favouriteProducts.length && (
            <span className="buttonFavouriteWrapper">
              {favouriteProducts.length}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className={classNames('buttonCart', styles.mobileMenuBottomBtn)}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {!!cartProducts.length && (
            <span className="buttonCartWrapper">{cartProducts.length}</span>
          )}
        </Link>
      </div>
    </aside>
  );
};
