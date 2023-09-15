import React, { FC, useContext } from 'react';
import { CartStorageContext } from '../../Context/CartStorageContext';
import { FavoritesStorageContext } from '../../Context/FavoritesStorageContext';
import { PageNavLink } from '../PageNavLink';

export const NavIcons: FC = () => {
  const { favourites } = useContext(FavoritesStorageContext);
  const { getTotalCartItems } = useContext(CartStorageContext);

  return (
    <>
      <PageNavLink
        url="/favorites"
        imagePath="./img/img/Favourites_heart.svg"
        counter={favourites.length > 0 ? favourites.length : null}
      />

      <PageNavLink
        url="/cart"
        imagePath="./img/img/Shopping_bag_cart.svg"
        counter={getTotalCartItems && getTotalCartItems()}
      />
    </>
  );
};
