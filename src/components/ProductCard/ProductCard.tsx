import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { cartItems, addToCart } = useCart();
  const alreadyInCart = cartItems.some(item => item.product.id === product.id);
  const favorited = isFavorite(product.id);

  const handleAddToCart = () => {
    if (!alreadyInCart) {
      addToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      {/* Heart button */}
      <div className={styles.heartIcon} onClick={() => toggleFavorite(product)}>
        {favorited ? '❤️' : '🤍'}
      </div>

      <Link to={`/product/${product.id}`}>
        <img src={product.image[0]} alt={product.name} />
      </Link>
      <h3>
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </h3>
      <p>
        <strong>Price:</strong> ${product.price}{' '}
        <span className={styles.fullPrice}>${product.fullPrice}</span>
      </p>
      <button onClick={handleAddToCart} disabled={alreadyInCart}>
        {alreadyInCart ? 'Added to cart' : 'Add to cart'}
      </button>
    </div>
  );
};

export default ProductCard;
