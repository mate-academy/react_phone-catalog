import { useContext } from 'react';
import { Product } from '../types/Product';
import { ProductsContext } from '../context/ProductsContext';
import cn from 'classnames';
import './ButtonFavourite.scss';

type Props = {
  favourite: Product;
  added?: boolean;
};

export const ButtonFavourite: React.FC<Props> = ({ favourite }) => {
  const { favourites, addToFavourites } = useContext(ProductsContext);
  const isFavourite = favourites.some(pr => pr.id === favourite.id);

  return (
    <button
      className={cn('button-favs', {
        'button-favs--liked': isFavourite,
      })}
      onClick={() => addToFavourites(favourite)}
    ></button>
  );
};
