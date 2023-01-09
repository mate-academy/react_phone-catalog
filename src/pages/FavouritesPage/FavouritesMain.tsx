import { FC } from 'react';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import {
  ProductsCatalog,
} from '../ProductsPage/sections/ProductsCatalog/ProductsCatalog';
import { EmptyFavourites } from './EmptyFavourites';

type Props = {
  title: string,
};

export const FavouritesMain: FC<Props> = ({
  title,
}) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', '');
  const [cartProducts, setCartProducts] = useLocalStorage('cart', '');

  return (
    <div className="products-section favourites-section">
      {favourites.length > 0 && (
        <div className="products-section__top">
          <h1 className="products-section__title">{title}</h1>
          <div className="products-section__product-count">{`${favourites.length} models`}</div>
        </div>
      )}

      {!favourites.length
        ? <EmptyFavourites />
        : (
          <div className="product-section__catalog-wrapper">
            <ProductsCatalog
              currentItems={favourites}
              favourites={favourites}
              setFavourites={setFavourites}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          </div>
        )}
    </div>
  );
};
