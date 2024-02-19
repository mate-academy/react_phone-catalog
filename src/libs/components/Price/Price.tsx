import cn from 'classnames';

import './Price.scss';

type Props = {
  discount: number,
  price: number,
  classNames?: string,
  priceFontSize?: number,
};

export const Price: React.FC<Props> = ({
  discount,
  price,
  classNames,
  priceFontSize = 22,
}) => {
  const discountPrice = discount
    ? Math.round(price + (price * (discount / 100)))
    : 0;

  return (
    <div
      className={cn(
        'price',
        classNames,
      )}
    >
      <p
        className="price__actual-price"
        style={{
          fontSize: priceFontSize,
        }}
      >
        {`$${price}`}
      </p>

      {!!discount && (
        <p className="price__old-price">
          {`$${String(discountPrice).slice(0, -1)}9`}
        </p>
      )}
    </div>
  );
};
