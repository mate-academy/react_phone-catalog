import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { useLocalStorage } from '../helpers/LocalStorage';
import { BreadcrumbsElement } from '../helpers/types/BreadcrumbsElement';
import {
  FavoritesCountContext,
} from '../helpers/context/FavoritesCountContext';
import { QUERY_KEY } from '../helpers/constants/SearchParamsKeys';
import { Product } from '../helpers/types/Product';
import { Header } from '../components/header/Header';
import { Breadcrumbs } from '../components/main/Breadcrumbs';
import { ProductsCount } from '../components/main/ProductsCount';
import { ProductsList } from '../components/main/ProductsList';
import { Title } from '../components/main/Title';
import { NoSearchResults } from '../components/main/NoSearchResults';
import { NoResults } from '../components/main/products/NoResults';

export const FavoritesPage = () => {
  const [getFavorites] = useLocalStorage('favorites');

  const [searchParams] = useSearchParams();

  const query = searchParams.get(QUERY_KEY)?.toLowerCase();
  const [
    displayedFavorites,
    setDisplayedFavorites,
  ] = useState<Product[]>(getFavorites() as Product[]);

  const [count, setCount] = useState(displayedFavorites.length);

  const increment = () => setCount(prevoisCount => prevoisCount + 1);

  const decrement = () => setCount(prevoisCount => prevoisCount - 1);

  const favoritesCountWord = query ? 'result' : 'item';
  const favoritesCountText = `${count} ${favoritesCountWord}${count === 1 ? '' : 's'}`;
  const favoritesCounterClasses = classNames('favorites__count', {
    'favorites__count--query': query,
  });
  const breadcrumbsPath: BreadcrumbsElement[] = [{
    text: 'Favourites',
  }];

  useEffect(() => {
    let newFavorites: Product[];

    if (query) {
      newFavorites = (getFavorites() as Product[]).filter(
        product => product.name.toLowerCase().includes(query),
      );
    } else {
      newFavorites = getFavorites() as Product[];
    }

    setDisplayedFavorites(newFavorites);
    setCount(newFavorites.length);
  }, [query, count]);

  return (
    <FavoritesCountContext.Provider value={{ increment, decrement }}>
      <Header
        hasSearch
        currentPage="favourites"
        favoritesCount={count}
      />

      <main className="favorites">
        {count ? (
          <>
            {!query && (
              <>
                <Breadcrumbs path={breadcrumbsPath} />

                <Title extraClassName="favorites__title">Favourites</Title>
              </>
            )}

            <ProductsCount
              countText={favoritesCountText}
              extraClasses={favoritesCounterClasses}
            />

            <ProductsList products={displayedFavorites} />
          </>
        ) : (
          <div className="favorites__no-search">
            {query ? (
              <NoSearchResults />
            ) : (
              <NoResults categoryName="Favorites" />
            )}
          </div>
        )}
      </main>
    </FavoritesCountContext.Provider>
  );
};
