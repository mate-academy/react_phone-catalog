import React from 'react';
import ReactTyped from 'react-typed';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { useAppSelector } from '../app/hooks';
import { ProductList } from '../components/ProductList/ProductList';
import { ProductNotFoundPage } from './ProductNotFoundPage';

type Props = {
  isLoading: boolean;
};

export const FavoritesPage: React.FC<Props> = ({ isLoading }) => {
  const [searchParams] = useSearchParams();
  const favoriteStore = useAppSelector(store => store.favorites);
  const query = searchParams.get('query');

  const searchedPhones = query
    ? favoriteStore.filter(phone => {
      return phone.name.toLowerCase().includes(query.toLowerCase());
    })
    : favoriteStore;

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="favoritePage">
      <div className="container">
        <div className="favoritePage__wrapper">
          <div className="favoritePage__breadCrumb">
            <Breadcrumbs phone={null} />
          </div>

          {!!searchedPhones.length && (
            <div className="favoritePage__all">
              <h2 className="title favoritePage__title">Favorites</h2>

              {!!searchedPhones.length && (
                <span className="favoritePage__itemCount">
                  {`${searchedPhones.length} items`}
                </span>
              )}

              {searchedPhones.length
                && (
                  <div className="favoritePage__list">
                    <ProductList products={searchedPhones} />
                  </div>
                )}
            </div>
          )}

          {!searchedPhones.length && query === null && (
            <div className="pageEmpty">
              <ReactTyped
                strings={['Your favorites is empty']}
                typeSpeed={75}
                className="title"
                showCursor={false}
              />
            </div>
          )}

          {!searchedPhones.length && query !== null && (
            <ProductNotFoundPage title="Favorite products were not found" />
          )}

        </div>
      </div>
    </div>
  );
};
