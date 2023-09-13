import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FavouritesContext } from '../context/FavsContext';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

export const FavoritesPage = () => {
  const { favItems } = useContext(FavouritesContext);
  const { pathname } = useLocation();
  const path = pathname.slice(1, 2).toUpperCase() + pathname.slice(2);

  return (
    <div className="container">
      <div className="favourites">
        <Breadcrumbs pathname={path} />
        <h1 className="favourites__title">
          Favourites
        </h1>

        {favItems.length ? (
          <p className="favourites__quantity">
            {`${favItems.length} items`}
          </p>
        ) : (
          <p className="favourites__quantity">There are no Favourite items</p>
        )}
        <div className="favourites__content">
          {favItems.map(item => (
            <div key={item.id}>
              <ProductCard product={item.product} />
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};
