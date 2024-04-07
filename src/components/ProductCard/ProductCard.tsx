import { Product } from '../../types/Product';
import { AddButton } from '../AddButton';
import { RoundButton } from '../RoundButton';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { image, name, fullPrice, price, screen, capacity, ram } = product;

  return (
    <div className="product-card">
      <img className="product-image" src={image} alt="Product Image" />
      <p className="product-title">{name} (MQ023)</p>
      <div className="product-price">
        <p className="product-price--regular">${price}</p>
        <p className="product-price--discount">${fullPrice}</p>
      </div>
      <div className="product-card__divider" />
      <div className="product-description">
        <div className="product-description__field">
          <p className="product-description__name">Screen</p>
          <p className="product-description__value">{screen}</p>
        </div>
        <div className="product-description__field">
          <p className="product-description__name">Capacity</p>
          <p className="product-description__value">{capacity}</p>
        </div>
        <div className="product-description__field">
          <p className="product-description__name">RAM</p>
          <p className="product-description__value">{ram}</p>
        </div>
      </div>
      <div className="product-actions">
        <AddButton text="Add to cart" />
        <RoundButton buttonType="fav" onClick={() => {}} />
      </div>
    </div>
  );
};
