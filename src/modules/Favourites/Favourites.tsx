import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Route } from '../shared/Route';
import { FavoutitesContext } from '../../store/FavouritesContext';
import { ProductCard } from '../shared/ProductCard';
import { Loader } from '../shared/Loader';

export const Favourites = () => {
  const { favouritesList, products, dataLoaded } =
    useContext(FavoutitesContext);

  const { pathname } = useLocation();
  const category = pathname.slice(1);

  return (
    <div className="favourites">
      <div className="favourites__route">
        <Route category={category} />
      </div>

      <h1 className="favourites__title primary-title">Favourites</h1>

      <p className="favourites__items">
        {favouritesList.length === 1
          ? '1 item'
          : `${favouritesList.length} items`}
      </p>

      {dataLoaded ? (
        <div className="favourites__items-container">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              discount={favouritesList[i].discount}
            />
          ))}
        </div>
      ) : (
        <div className="favourites__loader">
          <Loader />
        </div>
      )}
    </div>
  );
};
