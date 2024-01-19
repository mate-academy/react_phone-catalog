import classNames from 'classnames';

type ProductSpecProps = {
  name: string
  value: string
  isBig?: boolean
};

export const ProductSpec = (
  { name, value, isBig }: ProductSpecProps,
) => {
  const nameClasses = classNames('product-spec__name', {
    'product-spec__name--big': isBig,
  });
  const valueClasses = classNames('product-spec__value', {
    'product-spec__value--big': isBig,
    'product-spec__value--small': !isBig,
  });

  return (
    <div className="product-spec">
      <div className={nameClasses}>{name}</div>
      <div className={valueClasses}>{value}</div>
    </div>
  );
};

ProductSpec.defaultProps = {
  isBig: false,
};
