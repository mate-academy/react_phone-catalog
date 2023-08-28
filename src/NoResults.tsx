import { ProductTypes } from './types/productTypes';

type Props = {
  productType: ProductTypes,
};

export const NoResults: React.FC<Props> = ({ productType }) => (
  <h2 className="noResults">
    {`${productType} not found`}
  </h2>
);
