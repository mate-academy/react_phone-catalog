import '../components/Catalog/Catalog.scss';

import { Breadcrumbs } from '../components/Catalog/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { useCartFavorite } from '../context/CartFavoriteContext';

export const FavoritesPage = () => {
  const { favoriteItems } = useCartFavorite();

  return (
    <section className="catalog">
      <div className="container catalog__container">
        <Breadcrumbs />

        <h1 className="catalog__title">Favorite</h1>
        <div className="catalog__counter">
          {favoriteItems.length} model{favoriteItems.length === 1 ? '' : 's'}
        </div>

        <div className="catalog__wrapper">
          {favoriteItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
