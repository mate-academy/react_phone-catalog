import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../../hooks/useFavorites';
import styles from './ProductCard.module.scss'; // Importa os estilos do módulo SCSS
import AddToCartButton from '../../../../HomePage/components/AddToCart/AddToCart';
import AddToFavoritesButton from '../../../../HomePage/components/AddToFavorite/AddToFavorite';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    priceDiscount: number;
    priceRegular: number;
    image?: string;
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(product.id);

  return (
    <div className={styles.productCard}>
      <button
        className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
        onClick={() => toggleFavorite(product.id)}
      >
        ♥
      </button>

      
        {product.image && <img src={product.image} alt={product.name} className={styles.productImage} />}
        <div className={styles.productInfo}>
          
          <p className={styles.productName}>{product.name}</p>
          
          <p className={styles.productPrice}>
            ${product.priceDiscount}{' '}
            <span className={styles.productPriceRegular}>${product.priceRegular}</span>
          </p>
          <div className={styles.functionButtons}>
            <Link to={`/product/${product.id}`} className={styles.linkWrapper}>
    <button className= {styles.checkBtn}>Check Product!</button>
    </Link>
  <AddToFavoritesButton productId={product.id} />
</div>

        </div>
      
    </div>
  );
};

export default ProductCard;