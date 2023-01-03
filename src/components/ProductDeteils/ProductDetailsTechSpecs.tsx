type Props = {
  prop: string;
  value: string;
};

export const ProductDetailsTechSpecs: React.FC<Props> = ({
  value,
  prop,
}) => {
  return (
    <div className="product-details__section__tech-specs">
      <p className="product-details__section__tech-specs__prop">{prop}</p>
      <p className="product-details__section__tech-specs__value">
        {value || '-'}
      </p>
    </div>
  );
};
