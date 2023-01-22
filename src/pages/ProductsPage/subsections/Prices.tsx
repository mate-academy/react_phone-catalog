import { FC } from 'react';
import { Product } from 'src/types/Product';

type Props = {
  selectedProductGeneralInfo: Product,
};

export const Prices: FC<Props> = ({ selectedProductGeneralInfo }) => {
  const { price, fullPrice } = selectedProductGeneralInfo;

  return (
    <div className="specifications__prices">
      <div className="specifications__prices--new">
        {`$${price || fullPrice}`}
      </div>

      {price && (
        <div className="specifications__prices--old">
          {`$${fullPrice}`}
        </div>
      )}
    </div>
  );
};
