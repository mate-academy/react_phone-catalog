import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrubs';
import { StorageContext } from '../../components/StorageContext';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';
import React from 'react';

type FavouritesPageProps = {
  setFavLength: React.Dispatch<number>;
  setCartLength: React.Dispatch<number>;
};

export const FavouritesPage: React.FC<FavouritesPageProps> = ({
  setFavLength,
  setCartLength,
}) => {
  const { fav } = useContext(StorageContext);
  const [newFav, setNewFav] = useState(fav);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

 const filterFavs = (products: Product[]) => {
  return products.filter((product: Product) => {
    const itemId = product.itemId || ''; // Ensure itemId is a string
    const isValid = itemId && product.image && product.price !== undefined; // Add checks for validity
    return isValid && itemId
      .replaceAll('-', '')
      .includes(query.replace(/[^a-zA-Z0-9]/g, '').toLocaleLowerCase());
  });
};

  useEffect(() => {
    setNewFav(filterFavs(fav));
  }, [searchParams, fav]);

  useEffect(() => {
    setFavLength(fav.length);
  }, [fav.length]);

  return (
    <div className="fav-page">
      <Breadcrumbs />

      {newFav.length > 0 ? (
        <>
          <div className="fav-page__title">Favourites</div>

          <div className="fav-page__quantity">{`${fav.length} items`}</div>

          <ProductList
            products={newFav}
            isNormal
            setFavLength={setFavLength}
            setCartLength={setCartLength}
          />
        </>
      ) : (
        <div className="fav-page__empty-favourites">
          Your favourites are empty
        </div>
      )}
    </div>
  );
};
