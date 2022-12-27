import { FC } from 'react';
import { ProdcutDetails } from 'src/types/ProductDetails';

type Props = {
  selectedProductDetails: ProdcutDetails,
};

export const Title: FC<Props> = ({ selectedProductDetails }) => {
  return (
    <h1 className="details__title">
      {selectedProductDetails.name}
    </h1>
  );
};
