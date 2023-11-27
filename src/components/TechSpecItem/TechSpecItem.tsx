import { firstLetterToUppercase } from '../../helpers/calc/helper';

type TechSpecItemProps = {
  property: string,
  value: string | string[],
};

export const TechSpecItem: React.FC<TechSpecItemProps> = ({
  property,
  value,
}) => {
  const isValueString = typeof value === 'string';

  return (
    <div className="product-info__pair">
      <div className="product-info__property">
        {firstLetterToUppercase(property)}
      </div>
      <div className="product-info__value">
        {isValueString ? value : value.join(', ')}
      </div>
    </div>
  );
};
