import {
  useContext,
  useState,
  useEffect,
} from 'react';
import { Context } from './Context';
import { ProductCard } from './ProductCard';
import { Loader } from './Loader';
import { getFavouritesFromLocaleStorage } from './utils/updateLocaleStorage';

export const Favourites = () => {
  const { chosenProducts, loadingItem } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

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
          {chosenProducts.length !== 1 ? `${chosenProducts.length} models` : `${chosenProducts.length} model`}
        </div>
      )}

      <div className="favourites__container">
        <div className="favourites__list">
          {isLoading && (
            <div className="favourites__loader_container">
              <Loader />
            </div>
          )}

          {(getFavouritesFromLocaleStorage('favourites').length > 0
            && !isLoading) && (
            getFavouritesFromLocaleStorage('favourites').map((
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

          {(getFavouritesFromLocaleStorage('favourites').length === 0
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
