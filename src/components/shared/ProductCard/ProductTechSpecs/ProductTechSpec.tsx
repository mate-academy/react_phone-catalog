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

          <div className="details__info__wrap">
            {Array.isArray(value) ? (
              value.map((v, i) => (
                <p key={v} className="details__info">
                  {i !== value.length - 1 ? `${v},` : v}
                </p>
              ))
            ) : (
              <p className="details__info">{value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
