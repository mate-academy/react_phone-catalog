// Home.jsx
import { useState, useEffect } from 'react';
import { Carousel } from '../Components/Carousel/carousel';
import HotPrices from '../Components/HotPrices/hotprices';
import { Categories } from '../Components/Categories/categories';
import Newmodels from '../Components/NewModels/newmodels';
import { Product } from '../Components/ProductCard/types';

const Home = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      'https://mate-academy.github.io/react_phone-catalog/api/products.json',
    )
      .then((response) => response.json())
      .then((data) => {
        setFilteredProducts(data);

        const filteredDiscountedProducts = data.filter(
          (product: Product) => product.discount !== 0,
        );

        setDiscountedProducts((prevDiscountedProducts) => [
          ...prevDiscountedProducts,
          ...filteredDiscountedProducts,
        ]);
      })
      .catch((error) => setDiscountedProducts([error]));
    const storedFavoritesString = localStorage.getItem('favorites');
    const storedFavorites = storedFavoritesString
      ? JSON.parse(storedFavoritesString)
      : [];

    setFavoriteProducts(storedFavorites);

    const storedCartString = localStorage.getItem('cart');
    const storedCart = storedCartString ? JSON.parse(storedCartString) : [];

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
