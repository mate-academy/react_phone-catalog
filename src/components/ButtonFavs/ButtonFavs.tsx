import React, { useContext } from 'react';
import './ButtonFavs.scss';
import { ProductsContext } from '../context/ProductsContext';
import { Product } from '../types/Product';
import cn from 'classnames';

type Props = {
  favourite: Product;
  added?: boolean;
};

export const ButtonFavs: React.FC<Props> = ({ favourite }) => {
  const { favourites, addToFav } = useContext(ProductsContext);
  const isAddedToFavs = favourites.some(pr => pr.id === favourite.id);

  return (
    <button
      className={cn('button-favs', {
        'button-favs--liked': isAddedToFavs,
      })}
      onClick={() => addToFav(favourite)}
    ></button>
  );
};
