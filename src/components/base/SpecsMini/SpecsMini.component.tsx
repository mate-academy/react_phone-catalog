import { ProductSummary } from '../../../types/ProductSummary';

type Props = {
  product: ProductSummary;
};

export const SpecsMini: React.FC<Props> = ({ product }) => {
  return (
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
  );
};
