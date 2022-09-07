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

export const FavouritesPage = () => {
  const [products, setProducts] = useState([]);
  const { fav } = useContext(FavContext);
  const { query, setQuery } = useContext(QueryContext);

  useMemo(() => {
    const favItems = localStorage.getItem('FavItems');
    const parsedFavItems = favItems
      ? JSON.parse(favItems)
      : [];

    setProducts(parsedFavItems);
  }, [fav]);

  useEffect(() => {
    setQuery('');
  }, []);

  return (
    <div className="FavouritesPage page__section">
      <Header />
      <div className="container">

        {!query && (
          <>
            <Breadcrumbs />
            <h1 className="title page__title--products">Favourites</h1>
            <p className="body-text body-text--light FavouritesPage__qty">{`${products.length} models`}</p>
            <ProductsList products={products} />
          </>
        )}
        {query && <SearchPage appliedQuery={query} products={products} />}
      </div>
    </div>
  );
};
