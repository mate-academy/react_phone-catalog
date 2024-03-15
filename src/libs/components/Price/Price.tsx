import cn from 'classnames';

import './Price.scss';

type Props = {
  discountPrice: number,
  fullPrice: number,
  classNames?: string,
  priceFontSize?: number,
};

export const Price: React.FC<Props> = ({
  discountPrice,
  fullPrice,
  classNames,
  priceFontSize = 22,
}) => {
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
        {`$${fullPrice}`}
      </p>

      {!!discountPrice && (
        <p className="price__old-price">
          {`$${discountPrice}`}
        </p>
      )}
    </div>
  );
};
