import { Product } from '../../types/Product';
import './ProductCard.scss';
type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product__card">
      <img src={product.image} alt="" className="card__image" />
      <h4 className="card__name">{product.name}</h4>
      <div className="card__price">
        <span className="card__price--regular">${product.price}</span>
        <span className="card__price--discount">${product.fullPrice}</span>
      </div>
      <div className="card__describtion">
        <div className="card__spec">
          <span className="card__label">Screen</span>
          <span className="card__value">{product.screen}</span>
        </div>

        <div className="card__spec">
          <span className="card__label">Capacity</span>
          <span className="card__value">{product.capacity}</span>
        </div>

        <div className="card__spec">
          <span className="card__label">RAM</span>
          <span className="card__value">{product.ram}</span>
        </div>
      </div>
      <div className="card__buttons">
        <a href="" className="card__button--add-to-cart">
          Add to cart
        </a>
        <a href="#" className="card__button--icon"></a>
      </div>
    </div>
  );
};

export default ProductCard;
