import {
  useContext,
  useState,
  useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Context } from './Context';
import { ProductCard } from './ProductCard';
import { Loader } from './Loader';
import { Navigation } from './Navigation';

export const Favourites = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const {
    loadingItem,
    chosenProducts,
  } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const filteredProducts = chosenProducts.filter(
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

      <Navigation />
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
            filteredProducts.map(product => (
              product.id !== loadingItem ? (
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

          {(filteredProducts.length === 0
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
