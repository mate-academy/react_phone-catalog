import React, { useContext, useEffect } from 'react';
import './FavouritesPage.scss';
import { CatalogContext } from '../../../context/CatalogContext';
import { ProductCard } from '../../ProductCard';
import { NavigationPath } from '../../NavigationPath';

export const FavouritesPage: React.FC = () => {
  useEffect(() => {
    document.title = `Favourites - Nice Gadgets (UA)`;
  }, []);

  const { favouriteProducts } = useContext(CatalogContext);

  return (
    <main className="favouritesPage container">
      <NavigationPath />
      <div className="favouritesPage__titleBlock">
        {favouriteProducts.length > 0 ? (
          <>
            <h1>Favourites</h1>
            <p className="favouritesPage__titleBlock--productCounter bodyText">
              {favouriteProducts.length} items
            </p>
          </>
        ) : (
          <h1>Favourites is empty</h1>
        )}
      </div>

      {favouriteProducts.length > 0 && (
        <div className="favouritesPage__productBlock">
          {favouriteProducts.map(product => (
            <ProductCard
              key={product.itemId}
              product={product}
              translate={null}
            />
          ))}
        </div>
      )}
    </main>
  );
};
