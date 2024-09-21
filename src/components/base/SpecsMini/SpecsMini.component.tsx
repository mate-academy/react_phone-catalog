import { ProductSummary } from '../../../types/ProductSummary';

type Props = {
  product: ProductSummary;
};

export const SpecsMini: React.FC<Props> = ({ product }) => {
  return (
    <div className="specsMini">
      <div className="specsMini-line">
        <div className="specsMini-title">Screen</div>
        <div className="specsMini-content">{product.screen}</div>
      </div>
      <div className="specsMini-line">
        <div className="specsMini-title">Capacity</div>
        <div className="specsMini-content">{product.capacity}</div>
      </div>
      <div className="specsMini-line">
        <div className="specsMini-title">RAM</div>
        <div className="specsMini-content">{product.ram}</div>
      </div>
    </div>
  );
};
