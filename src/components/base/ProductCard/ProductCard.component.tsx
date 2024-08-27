import { ProductSummary } from '../../../types/ProductSummary';
import { Icon } from '../../base/Icon/Icon.component';

type Props = {
  product: ProductSummary;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="card">
      <div className="card__image">
        <figure>
          <img src={product.image} />
          <figcaption>{product.name}</figcaption>
        </figure>
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
          <Icon iconType="favorite" iconUse="bar" />
        </div>
      </div>
    </div>
  );
};
