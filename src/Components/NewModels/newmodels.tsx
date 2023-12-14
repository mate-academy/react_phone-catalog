import ProductCard from '../ProductCard/Productcard';
import './newmodels.scss';

interface NewModelsProps {
  filteredProducts: { id: string }[];
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  favoriteProducts: string[];
  setFavoriteProducts: React.Dispatch<React.SetStateAction<string[]>>;
  cartProducts: string[];
  setCartProducts: React.Dispatch<React.SetStateAction<string[]>>;
}

const Newmodels: React.FC<NewModelsProps> = ({
  filteredProducts,
  startIndex,
  setStartIndex,
  favoriteProducts,
  setFavoriteProducts,
  cartProducts,
  setCartProducts,
}) => {
  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(
      prevIndex + 1, filteredProducts.length - 1,
    ));
  };

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
        <p id="newModelsTitle" className="title">Brand new models</p>
        <div className="buttons-container">
          <div className="button-container">
            <button
              className={`button left ${startIndex === 0 ? 'inactive' : ''}`}
              onClick={handlePrev}
              disabled={startIndex === 0}
              type="button"
              aria-labelledby="newModelsTitle"
            />
          </div>
          <div className="button-container">
            <button
              className={`button right ${startIndex + 4 >= filteredProducts.length ? 'inactive' : ''}`}
              onClick={handleNext}
              disabled={startIndex + 4 >= filteredProducts.length}
              type="button"
              aria-labelledby="newModelsTitle"
            />
          </div>
        </div>
      </div>
      <div className="cards-container">
        <div className="scrollable-container">
          {filteredProducts.length > 0 && filteredProducts.slice(
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

export default Newmodels;
