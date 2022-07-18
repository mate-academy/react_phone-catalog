import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../type';
import './FavouritesButton.scss';

type Props = {
  cart: boolean,
  product: Product
};

export const FavouritesButton: React.FC<Props> = ({ cart, product }) => {
  const [addFavourites, setAddFavourites] = useState(false);
  const searchParams = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  useEffect(() => {}, [addFavourites]);

  const addToFavoutites = () => {
    let favourites: string[] = [];

    if (localStorage.getItem('favourites')) {
      favourites = JSON.parse(localStorage.getItem('favourites') || '');
    }

    if (!favourites.includes(product.id)) {
      localStorage.setItem('favourites', JSON.stringify([
        ...favourites,
        product.id,
      ]));
    } else {
      localStorage.setItem('favourites', JSON.stringify([
        ...favourites.filter((p: string) => p !== product.id),
      ]));
    }

    setAddFavourites(prev => !prev);
  };

  return (
    <button
      type="button"
      aria-label="Mute volume"
      className={classNames('favouritesButton', {
        'favouritesButton--focus': addFavourites === true
          || JSON.parse(localStorage.getItem('favourites') || '')
            .includes(product.id),
        'favouritesButton--cart': !cart,
        'favouritesButton--card': cart,
      })}
      onClick={() => {
        setAddFavourites(prev => !prev);
        addToFavoutites();
        searchParams.set('favourite', product.id);
        navigate({
          search: searchParams.toString(),
        });
      }}
    />
  );
};
