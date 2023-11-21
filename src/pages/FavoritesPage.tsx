import {
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { ICONS } from '../icons';
import { getCartFavorites } from '../helpers/getProductsByCategories';
import { GlobalContext } from '../store/GlobalContext';
import { ProductsList } from '../components/ProductsList';
import { Loader } from '../components/Loader';
import { Product } from '../type/Product';

export const FavoritesPage = () => {
  const [searchParams] = useSearchParams();
  const { localStore } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const cartFavorites = getCartFavorites(localStore);
  const query = searchParams.get('query')?.toLocaleLowerCase() || '';

  const getSortedFav = () => {
    let updatedState: Product[] = [...cartFavorites];

    if (query) {
      updatedState = updatedState
        .filter(item => item.name
          .toLocaleLowerCase()
          .includes(query));
    }

    return updatedState;
  };

  const loaded = useCallback(
    debounce(setIsLoading, 1000),
    [],
  );

  useEffect(() => {
    loaded(!isLoading);
  }, []);

  const visibleCarts = getSortedFav();

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-page__wrap">
          <div className="page-navigation">
            <Link to="/" className="page-navigation__link">
              <img src={ICONS.home_icon} alt="to home page" className="icon" />
            </Link>

            <img src={ICONS.arrow} alt="icon" className="icon icon--right" />

            <p
              className="page-navigation__text"
            >
              Favorites
            </p>
          </div>

          <div className="favorites-page__title">
            <h1 className="title title--h1">Favourites</h1>

            <p className="favorites-page__items__length">
              {`${visibleCarts.length} items`}
            </p>
          </div>

          {isLoading && <Loader />}

          {!isLoading && !visibleCarts.length && (
            <h2 className="title title--h2 title--empty-page">
              <strong>Your cart is empty</strong>
            </h2>
          )}

          {!isLoading && !!visibleCarts.length && (
            <div className="productList">
              <ProductsList phones={visibleCarts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
