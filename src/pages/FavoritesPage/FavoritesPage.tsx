import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Path } from '../../components/Path';
import { ProductsList } from '../../components/ProductsList';
import './FavoritesPage.scss';
import { NoProducts } from '../../components/NoProducts/NoProducts';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { prepareProducts } from '../../helpers/prepareProducts';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const sort = '';
  const preparedProducts = prepareProducts(favorites, { sort, query });

  return (
    <div className="favorites-page">
      <div className="favorites-page__content">
        <Path />

        <h1 className="favorites-page__title">
          Favorites
        </h1>

        <p className="favorites-page__amount">
          {preparedProducts.length === 1 ? (
            '1 item'
          ) : (
            `${preparedProducts.length} items`
          )}
        </p>

        {!!preparedProducts.length && (
          <ProductsList products={preparedProducts} />
        )}

        {preparedProducts.length === 0 && (query ? (
          <NoProducts products="favorites" isQuery={!!query} />
        ) : (
          <NoProducts products="favorites" />
        ))}
      </div>
    </div>
  );
};
