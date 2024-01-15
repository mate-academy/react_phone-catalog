import './FavouritesPage.scss';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PathBar } from '../../components/PathBar/PathBar';
import { Title } from '../../components/Title/Title';
import { ProductList } from '../../components/ProductList/ProductList';
import { FavouriteContext } from '../../contexts/FavoriteContext';
import { applyFilterAndSort } from '../../helpers/applyFilterAndSort';
import { Banner } from '../../components/Banner/Banner';

export const FavouritesPage = () => {
  const { favourites } = useContext(FavouriteContext);
  const [searchParams] = useSearchParams();
  const visibleFavourites = applyFilterAndSort(favourites, searchParams);

  return (
    <div className="favourites-page">
      <PathBar />
      <Title
        text="Favourites"
        length={favourites.length}
        filteredLength={visibleFavourites.length}
      />
      <ProductList products={visibleFavourites} />
      {!favourites.length
        && (<Banner message="You have no favourites yet..." />)}
    </div>
  );
};
