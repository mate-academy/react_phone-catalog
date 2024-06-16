import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { FavoutitesContext } from '../../store/FavouritesContext';
import { ProductCard } from '../shared/ProductCard';

export const Favourites = () => {
  const { favouritesList } = useContext(FavoutitesContext);

  const { pathname } = useLocation();
  const category = pathname.slice(1);

  return (
    <div className="favourites">
      <div className="favourites__route">
        <Breadcrumbs category={category} />
      </div>

      <h1 className="favourites__title primary-title">Favourites</h1>

      <p className="favourites__items">
        {favouritesList.length === 1
          ? '1 item'
          : `${favouritesList.length} items`}
      </p>

      <div className="favourites__items-container">
        {favouritesList.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            discount={favouritesList[i].discount}
          />
        ))}
      </div>
    </div>
  );
};
