import { ProductSummary } from '../../../types/ProductSummary';
import { Icon } from '../../base/Icon/Icon.component';
import { Button } from '../Button/Button.component';

type Props = {
  product: ProductSummary;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="card">
      <figure className="card__image-wrapper">
        <img src={product.image} className="card__image" />
      </figure>
      <div className="card__product-name">{product.name}</div>
      <div className="card__price">
        <div className="card__price-current">
          <h3>{product.price}</h3>
        </div>
        <div className="card__price-full">{product.fullPrice}</div>
      </div>
      <div className="card__specs">
        <div className="card__specs-line">
          <div className="card__specs-title">Screen</div>
          <div className="card__specs-content">{product.screen}</div>
        </div>
        <div className="card__specs-line">
          <div className="card__specs-title">Capacity</div>
          <div className="card__specs-content">{product.capacity}</div>
        </div>
        <div className="card__specs-line">
          <div className="card__specs-title">RAM</div>
          <div className="card__specs-content">{product.ram}</div>
        </div>
      </div>
      <div className="card__buttons">
        <Button title="Add to cart" buttonUse="cart" />
        <Icon iconType="favorite" iconUse="button-size40" />
      </div>
    </div>
  );
};
