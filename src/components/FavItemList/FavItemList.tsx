import { useContext } from 'react';
import { FavContext } from '../contexts/FavContextProvider';
import { ProductCard } from '../ProductCard/ProductCard';

export const FavItemList = () => {
  const { favourites } = useContext(FavContext);

  return (
    <ul className="fav-list">
      {favourites.map(product => {
        return (
          <li className="fav-list__item">
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
};
