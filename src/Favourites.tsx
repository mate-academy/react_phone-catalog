import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Context } from './Context';
import { ProductCard } from './ProductCard';
import { Product } from './types/Product';
import { getProducts } from './api/products';
import { Loader } from './Loader';

export const Favourites = () => {
  const { chosenProducts } = useContext(Context);
  const [favouriteProducts, setFavouriteProducts]
    = useState<Product[] | []>([]);
  const [Loading, setLoading] = useState('');
  const [isError, setIsError] = useState(false);
  const firstRender = useRef(true);

  const get = async (condition: string) => {
    setLoading(condition);
    setIsError(false);

    try {
      const response = await getProducts();

      setFavouriteProducts([...response as Product[]].filter(
        product => chosenProducts.includes(product.id),
      ));
    } catch {
      setIsError(true);
    } finally {
      setLoading('');
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      get('mount');
      firstRender.current = false;
    } else {
      get('update');
    }
  }, [chosenProducts]);

  return (
    <div className="favourites">
      <h1 className="favourites__title">
        Favourites
      </h1>

      {Loading === 'mount' && (
        <div className="favourites__amount">
          0 models
        </div>
      )}

      {(!Loading && !isError) && (
        <div className="phones__amount">
          {favouriteProducts.length !== 1 ? `${favouriteProducts.length} models` : `${favouriteProducts.length} model`}
        </div>
      )}

      <div className="favourites__container">
        <div className="favourites__list">
          {Loading === 'mount' && (
            <div className="favourites__loader_container">
              <Loader />
            </div>
          )}

          {isError && (
            <h2 className="favourites__title">
              Something went wrong
            </h2>
          )}

          {(!isError && favouriteProducts.length > 0) && (
            favouriteProducts.map(product => (
              chosenProducts.includes(product.id) ? (
                <ProductCard product={product} key={product.id} />
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

          {(!Loading && !isError && favouriteProducts.length < 1) && (
            <h2 className="favourites__title favourites__title--error">
              Favourites not found
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};
