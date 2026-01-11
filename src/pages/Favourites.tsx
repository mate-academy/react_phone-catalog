import { useSelector } from 'react-redux';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { FC } from 'react';
import { favouritesSelectors } from '../selectors/favouritesSelectors';

export const FavouritesPage: FC = () => {
  const favouritesProducts = useSelector(favouritesSelectors.selectAll);
  const isEmpty = favouritesProducts.length === 0;

  return (
    <div className="">
      <Breadcrumbs className="mt-6" />

      <h1 className="mt-6 text-h1 sm:mt-10">Favourites</h1>
      <p className="mt-2 text-body text-secondary">
        {favouritesProducts.length}{' '}
        {favouritesProducts.length === 1 ? 'item' : 'items'}
      </p>

      {isEmpty ? (
        <div className="flex flex-col items-center">
          <img
            src="/images/product-not-found.webp"
            alt="Favourites is empty"
            className="object-contain h-75"
          />
          <h2 className="text-h2 text-primary">Favourites is empty</h2>
        </div>
      ) : (
        <div>
          <ProductsList products={favouritesProducts} className="mt-6" />
        </div>
      )}
    </div>
  );
};
