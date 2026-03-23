import { Phone } from '../../types/Phone';
import './ProductCard.scss';
type ProductCardProps = {
  phone: Phone;
};

const ProductCard = ({ phone }: ProductCardProps) => {
  return (
    <div className="product__card">
      <img src="" alt="" className="card__image" />
      <h4 className="card__name">{phone.name}</h4>
      <div className="card__price">
        <span className="card__price--regular">${phone.priceRegular}</span>
        <span className="card__price--discount">${phone.priceDiscount}</span>
      </div>
      <div className="card__describtion">
        <div className="card__spec">
          <span className="card__label">Screen</span>
          <span className="card__value">{phone.screen}</span>
        </div>

        <div className="card__spec">
          <span className="card__label">Capacity</span>
          <span className="card__value">{phone.capacity}</span>
        </div>

        <div className="card__spec">
          <span className="card__label">RAM</span>
          <span className="card__value">{phone.ram}</span>
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
