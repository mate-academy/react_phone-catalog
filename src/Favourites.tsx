import {
  useContext,
  useState,
  useEffect,
} from 'react';
import { Context } from './Context';
import { ProductCard } from './ProductCard';
import { Loader } from './Loader';
import { getFavouritesFromLocaleStorage } from './utils/updateLocaleStorage';
import { LocaleStorageTypes } from './types/LocaleStorageTypes';

export const Favourites = () => {
  const { loadingItem, query } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const filteredProducts = getFavouritesFromLocaleStorage(
    LocaleStorageTypes.favourites,
  ).filter(
    product => product.name.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="favourites">
      <h1 className="favourites__title">
        Favourites
      </h1>

      {isLoading ? (
        <div className="favourites__amount">
          0 models
        </div>
      ) : (
        <div className="favourites__amount">
          {filteredProducts.length !== 1 ? `${filteredProducts.length} models` : `${filteredProducts.length} model`}
        </div>
      )}

      <div className="favourites__container">
        <div className="favourites__list">
          {isLoading && (
            <div className="favourites__loader_container">
              <Loader />
            </div>
          )}

          {(filteredProducts.length > 0
            && !isLoading) && (
            filteredProducts.map((
              product,
              index,
            ) => (
              index !== loadingItem ? (
                <ProductCard
                  product={product}
                  favouritesTimeout={1000}
                  key={product.id}
                />
              ) : (
                <div className="favourites__list_container">
                  <ProductCard product={product} key={product.id} />
                  <div className="favourites__list_loader">
                    <Loader />
                  </div>
                </div>
              )
            ))
          )}

          {(getFavouritesFromLocaleStorage(
            LocaleStorageTypes.favourites,
          ).length === 0
            && !isLoading) && (
            <h2 className="favourites__title favourites__title--error">
              Favourites not found
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};
