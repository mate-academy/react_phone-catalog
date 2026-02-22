import { useSelector } from 'react-redux';
import { favouritesSelectors } from '../selectors/favouritesSelectors';
import { ProductList } from '../components/Product/ProductList';
import { FC } from 'react';

export const FavouritesPage: FC = () => {
  const favouritesProducts = useSelector(favouritesSelectors.selectAll);

  if (!favouritesProducts || favouritesProducts.length < 1) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:mt-8 xl:mt-14">
        <img
          src="images/product-not-found.webp"
          alt="Favourites is empty"
          className="w-full max-w-1/2 sm:max-w-1/3"
        />
        <h2 className="text-h2 text-primary dark:text-d-white text-center">
          Favourites is empty
        </h2>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-h1 text-primary dark:text-d-white mt-6 sm:mt-10">
        Favourites
      </h1>
      <p className="text-body text-secondary dark:text-d-secondary mt-2">
        {favouritesProducts.length}{' '}
        {favouritesProducts.length === 1 ? 'item' : 'items'}
      </p>

      <ProductList products={favouritesProducts} className="mt-6" />
    </>
  );
};
