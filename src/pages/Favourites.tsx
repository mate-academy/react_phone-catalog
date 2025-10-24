// import { Breadcrumbs } from '../components/Breadcrumbs';
import { FC } from 'react';

export const FavouritesPage: FC = () => {
  return (
    <div className="">
      {/*<Breadcrumbs className="mt-[24px]" />*/}

      <h1 className="mt-[24px] text-h1 sm:mt-[40px]">Favourites</h1>
      <p className="mt-[8px] text-body text-secondary">
        {1} {1 === 1 ? 'item' : 'items'}
      </p>

      {true ? (
        <div className="flex flex-col items-center">
          <img
            src="/images/product-not-found.webp"
            alt="Favourites is empty"
            className="object-contain h-[300px]"
          />
          <h2 className="text-h2 text-primary">Favourites is empty</h2>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
