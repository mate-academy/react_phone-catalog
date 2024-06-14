import { Path } from '../Path';
import { ProductCard } from '../ProductCard';
import productsFromServer from '../../api/products.json';
import { ProductsTypes } from '../../types/ProductsTypes';
import { useContext } from 'react';
import { FavouritesContext } from '../../context/FavouritesContext';

export const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <main className="favourites flex">
      <Path parentClassName="favourites" />
      <h1 className="favourites__title">Favourites</h1>
      <p className="favourites__items-count body-text">
        {favourites.length > 0
          ? `${favourites.length} items`
          : 'No favourite items'}
      </p>
      <section className="favourites__items">
        {favourites.map(item => (
          <ProductCard
            key={item.id}
            product={item}
            productType={
              productsFromServer.find(product => product.itemId === item.id)
                ?.category ?? ProductsTypes.Phones
            }
          />
        ))}
      </section>
    </main>
  );
};
