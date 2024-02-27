import { NewParamsProps } from '../../types/NewParams';
import { ProductPage } from '../ProductPage';

type TabletPageProps = {
  addParam: (newParams: NewParamsProps) => void;
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const TabletsPage: React.FC<TabletPageProps> = ({
  addParam,
  setFavLength,
  setCartLength,
}) => {
  return (
    <ProductPage
      addParam={addParam}
      title="Tablets"
      productType="tablet"
      setFavLength={setFavLength}
      setCartLength={setCartLength}
    />
  );
};
