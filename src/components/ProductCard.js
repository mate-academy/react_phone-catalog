import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({
  product,
  cart,
  favorites,
  addToCart,
  addToFavorites,
}) {
  const isInCart = cart.some(item => item.id === product.id);
  const isFavorite = favorites.some(item => item.id === product.id);

  
  const imageSrc =
    product.images?.[0] ||
    product.image ||
    null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInCart) {
      addToCart(product);
    }
  };

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToFavorites(product);
  };

  return (
    <div className="product-card">
      <Link
        to={`/${product.category}/${product.id}`}
        className="product-link"
      >
        <div className="product-image">
          {imageSrc && (
            <img
              src={`/${imageSrc}`}
              alt={product.name}
            />
          )}
        </div>

        <h3 className="product-title">
          {product.name}
        </h3>
      </Link>

      <p className="product-category">
        {product.category}
      </p>

      <p className="product-price">
        ${product.priceDiscount}
      </p>

      <div className="product-actions">
        <button
          type="button"
          className={`neon-text-btn ${isInCart ? 'active' : ''}`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? '✓ Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`neon-text-btn heart ${isFavorite ? 'active' : ''}`}
          onClick={handleAddToFavorites}
        >
          {isFavorite ? '♥ Favorited' : '♡ Favorite'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
