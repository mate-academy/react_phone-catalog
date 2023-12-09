// HotPrices.tsx

import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/Productcard';
import './youmay.scss'; // Import your styling here

const YouMay: React.FC = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => product.discount !== 0);
        setDiscountedProducts(filteredProducts);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const storedFavorites: string[] | null = JSON.parse(localStorage.getItem('favorites'));
    setFavoriteProducts(storedFavorites || []);
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, discountedProducts.length - 1));
  };

  const handleAddToFavorite = (productId) => {
    if (!favoriteProducts.includes(productId)) {
      const updatedFavorites = [...favoriteProducts, productId];
      setFavoriteProducts(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className='discount-products-container'>
      <div className='title-holder'>
        <p className='title'>You may also like</p>
        <div className='buttons-container'>
          <div className='button-container'>
            <button
              className={`button left ${startIndex === 0 ? 'inactive' : ''}`}
              onClick={handlePrev}
              disabled={startIndex === 0}
            ></button>
          </div>
          <div className='button-container'>
            <button
              className={`button right ${startIndex + 4 >= discountedProducts.length ? 'inactive' : ''}`}
              onClick={handleNext}
              disabled={startIndex + 4 >= discountedProducts.length}
            ></button>
          </div>
        </div>
      </div>
      <div className='cards-container'>
        <div className='scrollable-container'>
          {discountedProducts.length > 0 && (
            discountedProducts.slice(startIndex, startIndex + 4).map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                onAddToFavorite={handleAddToFavorite}
                onAddToCart={() => {}}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default YouMay;
