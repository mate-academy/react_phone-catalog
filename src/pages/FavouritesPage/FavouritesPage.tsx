import { useContext } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import './FavouritesPage.scss';
import { FavouriteContext } from '../../context/FavouriteContext';
import ProductList from '../../components/ProductList/ProductList';

export const FavouritePage = () => {
  const { favourites } = useContext(FavouriteContext);

  return (
    <div className="FavouritesPage section">
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
        <ProductList
          products={favourites}
          isfilterVisible={false}
          isPaginationVisible={false}
        />
      </div>
    </div>
  );
};
