import classNames from 'classnames';

type ProductsCountProps = {
  countText: string
  extraClasses: string
};

export const ProductsCount = (
  { countText, extraClasses }: ProductsCountProps,
) => {
  const classes = classNames('products-count', extraClasses);

  return <p className={classes}>{countText}</p>;
};
