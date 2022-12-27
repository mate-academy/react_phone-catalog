import { FC } from 'react';
import { Product } from 'src/types/Product';

type Props = {
  selectedProductGeneralInfo: Product,
};

export const Prices: FC<Props> = ({ selectedProductGeneralInfo }) => {
  const { price, discount } = selectedProductGeneralInfo;
  const priceAfterDiscount = price - (price / 100) * discount;

  return (
    <div className="specifications__prices">
      <div className="specifications__prices--new">
        {`$${priceAfterDiscount}`}
      </div>
      <div className="specifications__prices--old">
        {`$${price}`}
      </div>
    </div>
  );
};
