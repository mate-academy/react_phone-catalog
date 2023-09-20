import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FavoritesContext } from '../../store/FavoritesContext';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import './style.scss';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';
import { NoProducts } from '../../components/NoProducts/NoProducts';
import { Titles } from '../../types/Titles';

export const FavoritesPage = () => {
  const { favoritesProducts } = useContext(FavoritesContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const visiblePhones = useMemo(() => {
    return query.trim()
      ? favoritesProducts.filter(({ name }) => {
        return name.toLowerCase().includes(query.trim().toLowerCase());
      })
      : favoritesProducts;
  }, [favoritesProducts, query]);

  return (
    <section className="favorites-page">
      <div className="favorites-page__breadcrumbs">
        <Breadcrumbs />
      </div>
      {favoritesProducts.length === 0 && (
        <NoProducts section="favorites" />
      )}
      {visiblePhones.length > 0 && favoritesProducts.length > 0 && (
        <>
          <h1 className="favorites-page__title">
            {Titles.FAVORITES}
          </h1>
          <p className="favorites-page__count">
            {`${visiblePhones.length} items`}
          </p>
          <div className="favorites-page__list">
            <ProductsList products={visiblePhones} />
          </div>
        </>
      )}
      {visiblePhones.length === 0 && favoritesProducts.length > 0 && (
        <NoSearchResults section="favorites" />
      )}
    </section>
  );
};
