/* eslint-disable no-restricted-syntax */
import '../../styles/pages/FavouritesPage/FavouritesPage.scss';

import { Crumbs } from '../../components/Crumbs';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/product';
import { Storage } from '../../types/storages';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { Item } from '../../types/storageItem';

export const FavouritesPage = () => {
  const [values, setValues]
  = useLocalStorage<Item<Product>[]>([], Storage.FAVOURITES);

  const isIncluded = (items: Item<Product>[], value: Product) => {
    for (const item of items) {
      if (item.value.id === value.id) {
        return true;
      }
    }

    return false;
  };

  const handleFavClick = (value: Product) => {
    if (isIncluded(values, value)) {
      setValues(prev => {
        return prev.filter(item => item.value.id !== value.id);
      });
    } else {
      setValues(prev => [...prev, { quantity: 1, value }]);
    }
  };

  return (
    <main className="fav-page">
      <Crumbs />

      <h1 className="fav-page__title">Favourites</h1>

      <p className="fav-page__quantity">{`${values.length} items`}</p>

      {values.length > 0 ? (
        <div className="fav-page__product-list">
          <ProductList
            products={values.map(value => value.value)}
            customFavHandler={handleFavClick}
          />
        </div>
      ) : (
        <h1 className="products-page__sad-message">Any favourites yet</h1>
      )}
    </main>
  );
};
