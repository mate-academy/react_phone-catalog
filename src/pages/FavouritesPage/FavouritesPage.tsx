/* eslint-disable no-restricted-syntax */
import '../../styles/pages/FavouritesPage/FavouritesPage.scss';

import { Crumbs } from '../../components/Crumbs';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/product';
import { Item } from '../../types/storageItem';

type Props = {
  isIncluded: (items: Item<Product>[], value: Product) => boolean;
  cart: Item<Product>[];
  fav: Item<Product>[];
  onSelectedClick: (value: Product) => void;
  onFavClick: (value: Product) => void;
};

export const FavouritesPage: React.FC<Props> = ({
  isIncluded,
  fav,
  cart,
  onFavClick,
  onSelectedClick,
}) => {
  return (
    <main className="fav-page">
      <Crumbs />

      <h1 className="fav-page__title">Favourites</h1>

      <p className="fav-page__quantity">{`${fav.length} items`}</p>

      {fav.length > 0 ? (
        <div className="fav-page__product-list">
          <ProductList
            products={fav.map(value => value.value)}
            cart={cart}
            fav={fav}
            onFavClick={onFavClick}
            onSelectedClick={onSelectedClick}
            isIncluded={isIncluded}
          />
        </div>
      ) : (
        <h1 className="products-page__sad-message">Any favourites yet</h1>
      )}
    </main>
  );
};
