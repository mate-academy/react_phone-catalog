import { Product } from '../../Type/products';
import '../ProductCard/ProductCard';

type Props = {
  tablet: Product;
};

export const ProductTabletCard: React.FC<Props> = ({ tablet }) => {
  const {
    name, ram, capacity, screen, price,
  } = tablet;

  return (
    <div className="ProductCard">
      <div className="ProductCard__photo">
        <img
          className="ProductCard__img"
          src="./img/products/motorola-xoom-with-wi-fi.0.jpg"
          alt={`${name}`}
        />
      </div>

      <div className="ProductCard__wrap">
        <div className="ProductCard__title">{name}</div>

        <div className="ProductCard__price">
          <div className="ProductCard__price-normal">{`$${price}`}</div>
          {price}
        </div>

        <div className="ProductCard__details">
          <div className="ProductCard__details-item">
            <div className="ProductCard__details-item__name">Screen</div>
            <div className="ProductCard__details-item__value">
              {screen || '-'}
            </div>
          </div>
          <div className="ProductCard__details-item">
            <div className="ProductCard__details-item__name">
              Capacity
            </div>
            <div className="ProductCard__details-item__value">
              {capacity || '-'}
            </div>
          </div>
          <div className="ProductCard__details-item">
            <div className="ProductCard__details-item__name">RAM</div>
            <div className="ProductCard__details-item__value">
              {ram || '-'}
            </div>
          </div>
        </div>

        <div className="ProductCard__buttons">
          {/* <BuyButtonCart /> */}
          {/* <FavouritesIcon id={id} /> */}
        </div>
      </div>
    </div>
  );
};
