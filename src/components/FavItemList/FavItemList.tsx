import './FavItemList.scss';
import { useContext } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { FavContext } from '../contexts/FavContextProvider';

export const FavItemList = () => {
  const { favourites } = useContext(FavContext);

  return (
    <ul className="fav-list">
      {favourites.map(product => {
        return (
          <li
            className="fav-list__item"
            key={product.itemId}
          >
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
};
