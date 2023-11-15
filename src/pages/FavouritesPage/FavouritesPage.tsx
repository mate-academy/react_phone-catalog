import { useContext } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import './FavouritesPage.scss';
import { FavouriteContext } from '../../context/FavouriteContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';

export const FavouritePage = () => {
  const { favourites } = useContext(FavouriteContext);

  return (
    <div className="FavouritesPage">
      <div className="FavouritesPage__breadcrumb">
        <Breadcrumb />
      </div>

      <h1 className="FavouritesPage__title">
        Favourites
      </h1>

      <p
        className="FavouritesPage__counter"
      >
        {favourites.length === 1
          ? `${favourites.length} item`
          : `${favourites.length} items`}
      </p>

      <div className="FavouritesPage__list">
        {favourites.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
