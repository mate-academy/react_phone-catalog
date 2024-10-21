import './ProductCard.scss';
import { Product } from '../../../types/Product';

interface ProductCardProps {
  product: Product;
  showFullPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showFullPrice }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-card__image" />
      <p className="product-card__name">{product.name}</p>
      <div className="product-card__prices">
        <h3 className="product-card__price">${product.price}</h3>
        {showFullPrice && <h3 className="product-card__fullprice">${product.fullPrice}</h3>}
      </div>
      <hr className="product-card__line" />
      <div className="product-card__specs">
        <h5 className="product-card__spec">
          Screen <span className="product-card__options">{product.screen}</span>
        </h5>
        <h5 className="product-card__spec">
          Capacity <span className="product-card__options">{product.capacity}</span>
        </h5>
        <h5 className="product-card__spec">
          RAM <span className="product-card__options">{product.ram}</span>
        </h5>
      </div>
      <div className="product-card__buttons">
        <button className="product-card__add-to-cart">Add to cart</button>
        <button className="product-card__wishlist">
          <img
            src="./img/icons/Favourites (Heart Like).png"
            alt="Favourites"
            className="product-card__favourites"
          />
        </button>
      </div>
    </div>
  );
};
