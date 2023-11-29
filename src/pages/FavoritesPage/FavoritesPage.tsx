import './FavoritesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useAppSelector } from '../../app/hooks';
import { Notification } from '../../components/Notification/Notification';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../types/Product';

export const FavoritesPage: React.FC = () => {
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const preparedProducts: Product[] = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase();
    let filteredProducts = [...favorites];

    if (query) {
      filteredProducts = filteredProducts.filter(
        (product) => product.name.toLowerCase().includes(normalizedQuery),
      );
    }

    return filteredProducts;
  }, [searchParams, favorites, query]);

  return (
    <section className="favorites">
      <Breadcrumbs />
      {favorites.length <= 0 ? (
        <>
          <Notification message="Favorites not found" />
        </>
      ) : (
        <>
          <h1>Favorites</h1>
          {favorites.length > 0 && (
            <div className="favorites__count">{`${favorites.length} items`}</div>
          )}
          <div className="favorites__container">
            {preparedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
