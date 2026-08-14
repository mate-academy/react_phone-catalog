import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const SpecsMini: React.FC<Props> = ({ product }) => {
  const screen = product.specs?.screen || product.screen || '—';
  const capacity = product.specs?.capacity || product.capacity || '—';
  const ram = product.specs?.ram || product.ram || '—';

  return (
    <div className="specsMini">
      <div className="specsMini-line">
        <div className="specsMini-title">Screen</div>
        <div className="specsMini-content">{screen}</div>
      </div>

      <div className="specsMini-line">
        <div className="specsMini-title">Capacity</div>
        <div className="specsMini-content">{capacity}</div>
      </div>

      <div className="specsMini-line">
        <div className="specsMini-title">RAM</div>
        <div className="specsMini-content">{ram}</div>
      </div>
    </div>
  );
};
