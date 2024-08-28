import { ProductType } from '../../types/ProductType';
import { ProductTypeExtended } from '../../types/ProductTypeExtended';
type Props = {
  className?: string;
  product: ProductType | ProductTypeExtended;
  specs: {
    key: keyof ProductType | keyof ProductTypeExtended;
    label: string;
  }[];
};

export const ProductSpecs: React.FC<Props> = ({
  className = '',
  product,
  specs,
}) => {
  return (
    <ul className={`product-specs ${className}`.trim()}>
      {specs.map(spec => (
        <li className="product-specs__item" key={spec.key}>
          {spec.label}
          <span className="product-specs__value">
            {String(product[spec.key as keyof ProductType])}
          </span>
        </li>
      ))}
    </ul>
  );
};
