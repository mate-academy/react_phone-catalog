import classNames from 'classnames';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { PageName } from '../../../types';
import { CatalogContext } from '../../../context/CatalogContext';

type Props = {
  name: PageName;
  handleClearQuery?: () => void;
};

export const FavCartLink: React.FC<Props> = ({ name, handleClearQuery }) => {
  const { favourites, cart, totalCartQuantity, menuIsActive, handleLinkClick } =
    useContext(CatalogContext);

  const handleClick = () => {
    handleLinkClick(false);
    if (handleClearQuery) {
      handleClearQuery();
    }
  };

  return (
    <NavLink
      to={name.toLowerCase()}
      onClick={handleClick}
      className={({ isActive }) => {
        return classNames('icon__favourite-cart-Block', {
          'icon__favourite-cart-Block--active': isActive,
          'icon__favourite-cart-Block--menu': menuIsActive,
        });
      }}
    >
      <div
        className={classNames('icon', {
          icon__favourite: name === PageName.Favourites,
          icon__cart: name === PageName.Cart,
        })}
      />

      {name === PageName.Favourites && !!favourites.length && (
        <span
          className={classNames('icon__elipse', {
            'icon__elipse--menu': menuIsActive,
          })}
        >
          {favourites.length}
        </span>
      )}

      {name === PageName.Cart && !!cart.length && (
        <span
          className={classNames('icon__elipse', {
            'icon__elipse--menu': menuIsActive,
          })}
        >
          {totalCartQuantity}
        </span>
      )}
    </NavLink>
  );
};
