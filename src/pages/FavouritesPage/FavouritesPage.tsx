import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { searchProducts } from '../../helpers/searchProduct';
import { useAppContext } from '../../store/AppContext';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { state: { favourites } } = useAppContext();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('query') || '';
  const isSearchEmpty = searchQuery.trim() === '';

  const quantity = favourites.length;
  let shownProducts = favourites;

  if (!isSearchEmpty) {
    shownProducts = searchProducts(searchQuery, [...favourites]);
  }

  return (
    <div className="favourites-page">
      {isSearchEmpty && (
        <>
          <div className="favourites-page__section">
            <Breadcrumbs />
          </div>

          <div className="favourites-page__section">
            <h1 className="favourites-page__title">Favourites</h1>
            <span className="favourites-page__quantity">
              {`${quantity} item${quantity !== 1 ? 's' : ''}`}
            </span>
          </div>
        </>
      )}

      {!isSearchEmpty && (
        <div
          className="favourites-page__search-results"
        >
          <span
            className="favourites-page__search-results-amount"
          >
            {`${shownProducts.length} result${shownProducts.length !== 1 ? 's' : ''}`}
          </span>
        </div>
      )}

      <div className="favourites-page__main-content">
        {quantity === 0 && isSearchEmpty
          ? (
            <div className="favourites-page__no-favourites">
              <span
                className="favourites-page__no-favourites-text"
              >
                No favourites yet.
              </span>
              <span
                className="favourites-page__no-favourites-text"
              >
                Press
                <span className="favourites-page__no-favourites-icon" />
                to add an item to favourites
              </span>
            </div>
          )
          : <ProductsList products={shownProducts} />}

        {!isSearchEmpty && shownProducts.length === 0 && (
          <NoSearchResults searchQuery={searchQuery} />
        )}
      </div>

    </div>
  );
};
