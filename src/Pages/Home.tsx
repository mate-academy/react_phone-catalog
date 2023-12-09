// Home.jsx
import React, { useState, useEffect } from 'react';
import Carousel from '../Components/Carousel/carousel';
import HotPrices from '../Components/HotPrices/hotprices';
import Categories from '../Components/Categories/categories';
import Newmodels from '../Components/NewModels/newmodels';

const Home = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Добавляем состояние для filteredProducts
  const [startIndex, setStartIndex] = useState(0);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  // Fetch and set initial data
  useEffect(() => {
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then((response) => response.json())
      .then((data) => {
        setFilteredProducts(data);

        const filteredDiscountedProducts = data.filter((product) => product.discount !== 0);
        setDiscountedProducts(filteredDiscountedProducts);
      })
      .catch((error) => console.error('Error fetching products:', error));

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteProducts(storedFavorites);

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartProducts(storedCart);
  }, []);

  return (
    <>
      <Carousel />
      <HotPrices
        discountedProducts={discountedProducts}
        startIndex={startIndex}
        setStartIndex={setStartIndex}
        favoriteProducts={favoriteProducts}
        setFavoriteProducts={setFavoriteProducts}
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
      />
      <Categories />
      <Newmodels
        filteredProducts={filteredProducts}
        startIndex={startIndex}
        setStartIndex={setStartIndex}
        favoriteProducts={favoriteProducts}
        setFavoriteProducts={setFavoriteProducts}
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
      />
    </>
  );
};

export default Home;
