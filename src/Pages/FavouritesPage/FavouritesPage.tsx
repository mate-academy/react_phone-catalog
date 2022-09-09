import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { FavContext } from '../../Components/Context/FavContextProvider';
import { QueryContext } from '../../Components/Context/QueryContext';
import { Header } from '../../Components/Header/Header';
import { ProductsList } from '../../Components/ProductsList/ProductsList';
import './FavouritesPage.scss';
import { SearchPage } from '../SearchPage/SearchPage';
import { parseStorage } from '../../Helpers/functions/storage-helpers';
import { StorageItem } from '../../Helpers/types/StorageItem';
import { Product } from '../../Helpers/types/Product';

export const FavouritesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { fav } = useContext(FavContext);
  const { query, setQuery } = useContext(QueryContext);

  useMemo(() => {
    const parsedFavItems = parseStorage('FavItems');
    const productsArray = parsedFavItems.map((item: StorageItem) => {
      return item.product;
    });

    setProducts(productsArray);
  }, [fav]);

  useEffect(() => {
    setQuery('');
  }, []);

  return (
    <div className="FavouritesPage page__section">
      <Header />
      <div className="container">

        {query
          ? <SearchPage appliedQuery={query} products={products} />
          : (
            <>
              <Breadcrumbs />
              <h1 className="title page__title--products">Favourites</h1>
              <p className="body-text body-text--light FavouritesPage__qty">{`${products.length} models`}</p>
              <ProductsList products={products} />
            </>
          )}
      </div>
    </div>
  );
};
