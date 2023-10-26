import { ProductTypes } from './types/productTypes';

type Props = {
  productType: ProductTypes | string,
};

export const NoResults: React.FC<Props> = ({ productType }) => (
  <h2 className="noResults">
    {`Ooops, ${productType} not found :(`}
  </h2>
);
