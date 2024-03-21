import { useContext } from 'react';
import { PathRoute } from '../PathRoute';
import './FavouritesPage.scss';
import { StateContext } from '../../store/ProductsContext';
import { ProductCard } from '../ProductCard';

export const FavouritesPage = () => {
  const { favourites } = useContext(StateContext);

  // console.log(favourites);

  return (
    <div className="Favourites">
      <PathRoute />

      <h1 className="Favourites__title">Favourites</h1>
      <div className="Favourites__amount">{`${favourites.length} items`}</div>
      <div className="Favourites__content">
        {favourites.map(product => (
          <div className="Favourites__content-item" key={product.id}>
            <ProductCard product={product} isFavourite />
          </div>
        ))}
      </div>
    </div>
  );
};
