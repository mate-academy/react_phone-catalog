import { FC } from 'react';
import { AddButton } from 'src/components/AddButtons';
import { Product } from 'src/types/Product';

type Props = {
  selectedProductGeneralInfo: Product,
};

export const ShopButton: FC<Props> = ({
  selectedProductGeneralInfo,
}) => {
  return (
    <AddButton
      product={selectedProductGeneralInfo}
    />
  );
};
