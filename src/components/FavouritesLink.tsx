import React, { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { HeaderLink } from './HeaderLink';
import { Icon } from './Icon';

export const FavouritesLink: React.FC = () => {
  const { favouritesList } = useContext(ProductsContext);

  return (
    <HeaderLink to="/Favourites" className="header__item">
      <Icon
        cartsNumber={favouritesList.length}
        icon="favourites"
      />
    </HeaderLink>
  );
};
