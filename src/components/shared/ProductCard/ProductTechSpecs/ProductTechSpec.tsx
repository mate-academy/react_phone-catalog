import './ProductTechSpecs.style.scss';

import { Product } from '../../../../types/Product';

type Props = {
  specs: Partial<Product>;
};

export const ProductTechSpecs: React.FC<Props> = ({ specs }) => {
  return (
    <div className="details">
      {Object.entries(specs).map(([spec, value]) => (
        <div key={spec} className="details__wrap">
          <p className="details__title">{spec}</p>
          <p className="details__info">{value}</p>
        </div>
      ))}
    </div>
  );
};
