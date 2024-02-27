import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrubs';
import { StorageContext } from '../../components/StorageContext';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';
import { NoSearchResults } from '../../components/NoSearchResults';

type FavoritesPageProps = {
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  setFavLength,
  setCartLength,
}) => {
  const { fav } = useContext(StorageContext);
  const [newFav, setNewFav] = useState(fav);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filterFavs = (products: Product[]) => {
    return products.filter((product: Product) => {
      return product.itemId.replaceAll('-', '')
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

      <div className="fav-page__title">
        Favourites
      </div>

      <div className="fav-page__quantity">
        {`${fav.length} items`}
      </div>

      {newFav.length > 0
        ? (
          <ProductList
            products={newFav}
            isNormal
            setFavLength={setFavLength}
            setCartLength={setCartLength}
          />
        )
        : (
          <NoSearchResults />
        )}
    </div>
  );
};
