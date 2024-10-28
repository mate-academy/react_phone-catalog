import { Product } from '../../types/ProductCard';
import { favouritesIcon } from '../../assets/icons';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productId = product.itemId;

  return (
    <div className="product-card">
      <Link to={`/product/${productId}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
        />
      </Link>
      <Link to={`/product/${productId}`}>
        <h3 className="product-card__title">{product.name}</h3>
      </Link>
      <p className="product-card__price">${product.price}</p>
      <div className="product-card__specs">
        <div className="product-card__details">
          <span className="product-card__property">Screen:</span>
          <span className="product-card__value">{product.screen}</span>
        </div>
        <div className="product-card__details">
          <span className="product-card__property">Capacity</span>
          <span className="product-card__value">{product.capacity}</span>
        </div>
        <div className="product-card__details">
          <span className="product-card__property">RAM</span>
          <span className="product-card__value">{product.ram}</span>
        </div>
      </div>
      <div className="product-card__actions">
        <button className="product-card__button">Add to cart</button>
        <a href="#">
          <img
            src={favouritesIcon}
            alt="Favourites"
            className="product-card__icon"
          />
        </a>
      </div>
    </div>
  );
};
