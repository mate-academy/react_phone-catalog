import React, { MouseEventHandler, useContext } from 'react';
import classNames from 'classnames';

import styles from './MobileMenu.module.scss';
import '../../App.scss';
import { Navigation } from '../Navigation';
import { Link } from 'react-router-dom';
import { CartContext, FavouriteContext } from '../../ContextProvider';
import { instantScroll } from '../../utils/instantScroll';

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

  const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    instantScroll(e);
  };

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
          to="/favorites"
          className={classNames('buttonFavourite', styles.mobileMenuBottomBtn)}
          onClick={handleClick}
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
          onClick={handleClick}
        >
          {!!cartProducts.length && (
            <span className="buttonCartWrapper">{cartProducts.length}</span>
          )}
        </Link>
      </div>
    </aside>
  );
};
