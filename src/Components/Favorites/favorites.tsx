// Favorites.tsx
import React, { useState, ChangeEvent } from 'react';
import ProductCard from '../ProductCard/Productcard';
import { useFavoritesContext } from '../cartcontext/cartcontext';

const Favorites: React.FC = () => {
  const {
    favoriteProducts,
  } = useFavoritesContext();
  const [searchInput, setSearchInput] = useState<string>('');

  const handleAddToCart = (productId: string) => {
    return productId;
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredFavorites = favoriteProducts.filter(
    (productId: string) => productId
      .includes(searchInput.toLowerCase()),
  );

  return (
    <>
      <div className="folder-holder">
        <button type="button" className="home-button">
          <img src="img/Home.svg" alt="Home" />
        </button>
        <img src="img/Chevron-right.svg" alt="Chevron" />
        <p className="page-name">Favorites</p>
      </div>
      <h3 className="page-title">Favorites</h3>
      <p className="product-counter">
        {favoriteProducts.length > 1
          ? `${favoriteProducts.length} items`
          : `${favoriteProducts.length} item`}
      </p>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search in favorites..."
          style={{ width: '327px', height: '64px' }}
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="products-container">
        {filteredFavorites.map((productId: string) => (
          <ProductCard
            key={productId}
            productId={productId}
            onAddToCart={handleAddToCart}
            onAddToFavorite={handleAddToCart}
          />
        ))}
      </div>
    </>
  );
};

export default Favorites;
