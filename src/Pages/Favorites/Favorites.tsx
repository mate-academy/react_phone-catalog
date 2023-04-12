import { useSearchParams } from 'react-router-dom';
import { Location } from '../../Components/Location/Location';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useLocaleStorage } from '../../Helpers/LocaleStorage';
import { querySort } from '../../Helpers/Helpers';

import './Favorites.scss';
import { EmptyPage } from '../EmptyPage/EmptyPage';
import { Product } from '../../Types/Product';

export const Favorites = () => {
  const [favoritesProducts] = useLocaleStorage<Product[]>('favoritesItems', []);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const preparetedFavorites = querySort(favoritesProducts, query);

  return (
    <div className="favorite">
      <div className="container">
        <div className="favorite__container">
          <Location />

          <h1>Favorites</h1>
          <p>{`${preparetedFavorites.length} items`}</p>
        </div>

        <div className="favorite__wrapper">
          {!preparetedFavorites.length ? (
            <EmptyPage />
          ) : (
            <>
              {preparetedFavorites.map((product) => (
                <ProductCard product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
