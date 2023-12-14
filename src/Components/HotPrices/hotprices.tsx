import React, { useEffect, Dispatch, SetStateAction } from 'react';
import ProductCard from '../ProductCard/Productcard';
import './hotprices.scss';

interface HotPricesProps {
  discountedProducts: { id: string }[];
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  favoriteProducts: string[];
  setFavoriteProducts: Dispatch<SetStateAction<string[]>>;
  cartProducts: string[];
  setCartProducts: React.Dispatch<React.SetStateAction<string[]>>;
}

const HotPrices: React.FC<HotPricesProps> = ({
  discountedProducts,
  startIndex,
  setStartIndex,
  favoriteProducts,
  setFavoriteProducts,
  cartProducts,
  setCartProducts,
}) => {
  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(
      prevIndex + 1, discountedProducts.length - 1,
    ));
  };

  useEffect(() => {
    const storedFavoritesString = localStorage.getItem('favorites');
    const storedFavorites: string[] = storedFavoritesString
      ? JSON.parse(storedFavoritesString)
      : [];

    setFavoriteProducts((prevFavorites) => {
      return [...prevFavorites, ...storedFavorites];
    });
  }, [setFavoriteProducts]);

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleAddToCart = (productId: string) => {
    if (!cartProducts.includes(productId)) {
      const updatedCartProducts = [...cartProducts, productId];

      setCartProducts(updatedCartProducts);
      localStorage.setItem('cart', JSON.stringify(updatedCartProducts));
    }
  };

  const handleAddToFavorite = (productId: string) => {
    if (!favoriteProducts.includes(productId)) {
      const updatedFavoriteProducts = [...favoriteProducts, productId];

      setFavoriteProducts(updatedFavoriteProducts);
      localStorage.setItem('favorites',
        JSON.stringify(updatedFavoriteProducts));
    }
  };

  return (
    <div className="discount-products-container">
      <div className="title-holder">
        <p className="title" id="hotPricesTitle">Hot prices</p>
        <div className="buttons-container">
          <div className="button-container">
            <button
              className={`button left ${startIndex === 0 ? 'inactive' : ''}`}
              onClick={handlePrev}
              disabled={startIndex === 0}
              type="button"
              aria-labelledby="hotPricesTitle"
            />
          </div>
          <div className="button-container">
            <button
              className={`button right ${startIndex + 4 >= discountedProducts.length ? 'inactive' : ''}`}
              onClick={handleNext}
              disabled={startIndex + 4 >= discountedProducts.length}
              type="button"
              aria-labelledby="hotPricesTitle"
            />
          </div>
        </div>
      </div>
      <div className="cards-container">
        <div className="scrollable-container">
          {discountedProducts.length > 0
            && discountedProducts.slice(
              startIndex, startIndex + 4,
            ).map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                onAddToFavorite={() => handleAddToFavorite(product.id)}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HotPrices;
