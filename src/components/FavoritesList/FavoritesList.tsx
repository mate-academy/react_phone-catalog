import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { useFavorites } from '../../context/FavoritesContext';
import { useProducts } from '../../context/ProductContext';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import './FavoritesList.scss';

export const FavoritesList: React.FC = () => {
  const { favorites } = useFavorites();
  const { products } = useProducts();

  const favoriteProducts = products.filter(product =>
    favorites.includes(product.id.toString()),
  );

  const breadcrumbItems = [{ label: 'Favorites' }];

  return (
    <div className="favorites-page">
      <Header />
      <div className="favorites-list">
        <Breadcrumbs items={breadcrumbItems} />
        <h2 className="favorites-list__title">Favorites</h2>
        {favoriteProducts.length === 0 ? (
          <div className="favorites-list--empty">
            <p className="favorites-list__empty-message">
              No favorite products yet
            </p>
          </div>
        ) : (
          <div className="favorites-list__grid">
            {favoriteProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.image}
                screen={product.screen}
                capacity={product.capacity}
                ram={product.ram}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
