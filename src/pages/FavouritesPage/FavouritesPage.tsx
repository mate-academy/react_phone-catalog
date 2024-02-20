/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { Search } from '../../components/Search';
import { getFilteredProducts } from '../../helpers/getFilteredProducts';
import { FavouritesProductsContext } from '../../store/FavouritesContext';

import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { favouritesProducts } = useContext(FavouritesProductsContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const navigate = useNavigate();

  const visibleProducts = getFilteredProducts(favouritesProducts, { query });
  const countOfFavourites = visibleProducts.length;

  const textCountItems = countOfFavourites === 1
    ? '1 item'
    : `${countOfFavourites} items`;

  return (
    <div className="favourite favourite__content">
      {!!countOfFavourites && (
        <Search type="mobile" />
      )}

      {!query && <Breadcrumbs />}

      {favouritesProducts.length === 0 && (
        <div className="favourite__back">
          <button
            type="button"
            className="button-icon button-icon--arrow-left"
            onClick={() => navigate(-1)}
          />

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="favourite__back-button"
          >
            Back
          </button>
        </div>
      )}

      <div className="favourite__title">
        <h1 className="title title--pages">
          Favourites
        </h1>

        {countOfFavourites > 0 && (
          <p>{textCountItems}</p>
        )}

        {query.length > 0 && countOfFavourites === 0 && (
          <h2>No product matches your request</h2>
        )}
      </div>

      {favouritesProducts.length === 0 && (
        <h2>Your favourites list is empty</h2>
      )}

      <ul className="favourite__list">
        {visibleProducts.map(product => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
