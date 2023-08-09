import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { FavContext } from '../../context/FavContext';
import { Search } from '../../components/Search';

export const FavouritesPage = () => {
  const { favourites } = useContext(FavContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <>
      {query ? (
        <Search products={favourites} />
      ) : (
        <ProductsList products={favourites} title="Favourites" />
      )}
    </>
  );
};
