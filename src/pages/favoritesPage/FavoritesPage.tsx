import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { ProductCard } from '../../components/productCard/ProductCard';
import { BreadCrumbs } from '../../components/breadcrumbs';
import { scrollToTop } from '../../services/utils/scrollToTop';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(ProductsContext);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <main className="products-page">
      <BreadCrumbs category="Favorites" />
      <h1 className="products-page__title">Favorites</h1>

      <p className="products-page__models-title">
        {`${favorites.length} item${favorites.length > 1 ? 's' : ''}`}
      </p>
      {favorites.length ? (
        <div className="products-page__phone-cards">
          {favorites.map(item => (
            <div key={item.id}>
              <ProductCard
                image={item.image}
                name={item.name}
                price={item.price}
                fullPrice={item.fullPrice}
                screen={item.screen}
                capacity={item.capacity}
                ram={item.ram}
                product={item}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="page-not-found">
          <h3 className="page-not-found__title">No favorites yet</h3>
          <img
            src="img/cart-is-empty.png"
            alt="empty cart"
            className="page-not-found__image"
          />
        </div>
      )}
    </main>
  );
};
