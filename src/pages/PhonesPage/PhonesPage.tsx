import { NewParamsProps } from '../../types/NewParams';
import { ProductPage } from '../ProductPage';

type PhonePageProps = {
  addParam: (newParams: NewParamsProps) => void;
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const PhonesPage: React.FC<PhonePageProps> = ({
  addParam,
  setFavLength,
  setCartLength,
}) => {
  return (
    <ProductPage
      addParam={addParam}
      title="Mobile phones"
      productType="phones"
      setFavLength={setFavLength}
      setCartLength={setCartLength}
    />
  );
};
