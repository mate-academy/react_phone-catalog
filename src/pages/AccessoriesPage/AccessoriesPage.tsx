import { NewParamsProps } from '../../types/NewParams';
import { ProductPage } from '../ProductPage';

type AccessoriesPageProps = {
  addParam: (newParams: NewParamsProps) => void;
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const AccessoriesPage: React.FC<AccessoriesPageProps> = ({
  addParam,
  setFavLength,
  setCartLength,
}) => {
  return (
    <ProductPage
      addParam={addParam}
      title="Accessories"
      productType="accessory"
      setFavLength={setFavLength}
      setCartLength={setCartLength}
    />
  );
};
