import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/Productcard';
import { useFavoriteContext } from '../favoritescontext/FavoriteContext';
import home from './Home.svg';
import chevron from './Chevron-right.svg';

const Favorites = () => {
  const { favoriteProducts, setFavoriteProducts } = useFavoriteContext();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteProducts(storedFavorites);
  }, []);


  const handleAddToFavorite = (productId) => {
    if (!favoriteProducts.includes(productId)) {
      const updatedFavorites = [...favoriteProducts, productId];
      setFavoriteProducts(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleAddToCart = (productId) => {
    console.log(`Added to cart: ${productId}`);
  };

  const filteredFavorites = favoriteProducts.filter((productId) =>
    productId.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className='folder-holder'>
        <button className='home-button'>
          <img src={home} alt="Home" />
        </button>
        <img src={chevron} alt="Chevron" />
        <p className='page-name'>Fauvorites</p>
      </div>
      <h3 className='page-title'>Favourites</h3>
      <p className='product-counter'>{favoriteProducts.length > 1 ? favoriteProducts.length +' ' + 'items' : favoriteProducts.length +' ' +  'item'}</p>
      <h3>Favourites</h3>
      <div className='search-container'>
        <input
          className='search-input'
          type='text'
          placeholder='Search in favorites...'
          style={{ width: '327px', height: '64px' }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className='products-container'>
        {filteredFavorites.map((productId) => (
          <ProductCard
            key={productId}
            productId={productId}
            onAddToFavorite={handleAddToFavorite}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </>
  );
};

export default Favorites;
