import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ProductList } from '../components/ProductList';
import { CatalogContext } from '../context';
import '../styles/favorites.scss';
import { NoResults } from '../components/NoResults/NoResults';

export const FavoritesPage = () => {
  const { favorites } = useContext(CatalogContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const visibleItems = favorites
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="favorites">
      <div className="container">
        <BreadCrumbs />
        <h1 className="favorites__title">
          Favourites
        </h1>
        <div className="favorites__count">
          {query ? `${visibleItems.length} results` : `${favorites.length} items`}
        </div>

        {visibleItems.length > 0 ? (
          <ProductList products={visibleItems} />
        ) : (
          <NoResults name="Product" />
        )}
      </div>
    </section>
  );
};
