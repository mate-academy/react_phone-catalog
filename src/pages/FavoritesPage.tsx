import '../components/Catalog/Catalog.scss';

import { Breadcrumbs } from '../components/Catalog/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { useCartFavorite } from '../context/CartFavoriteContext';
import { Empty } from '../components/Empty';
import emptyCart from './../images/img/unknown.jpg';

export const FavoritesPage = () => {
  const { favoriteItems } = useCartFavorite();

  return (
    <section className="catalog">
      <div className="container catalog__container">
        <Breadcrumbs />

        <h1 className="catalog__title">Favorite</h1>
        <div className="catalog__counter">
          {favoriteItems.length > 0 &&
            favoriteItems.length +
              ' model' +
              (favoriteItems.length === 1 ? '' : 's')}
        </div>
        {favoriteItems.length === 0 ? (
          <Empty srcImage={emptyCart} />
        ) : (
          <div className="catalog__wrapper">
            {favoriteItems.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
