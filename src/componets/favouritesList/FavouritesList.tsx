import './FavouritesList.scss';
import { useAppSelector } from '../../app/hooks';
import { NoResults } from '../noResults/NoResults';
import { ProductCard } from '../productCard/ProductCard';

export const FavouritesList = () => {
  const listOfFavourites = useAppSelector(state => state.favourites.list);
  const amount = listOfFavourites.length;

  return (
    <div className="favourites">
      {amount > 0
        ? (
          <div className="favourites__container">
            {listOfFavourites.map(
              (product) => <ProductCard key={product.id} product={product} />,
            )}
          </div>
        )
        : <NoResults /> }
    </div>
  );
};
