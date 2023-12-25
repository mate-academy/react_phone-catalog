import { ProductType } from '../../types/ProductType';
import './NoSearchResults.scss';

type Props = {
  productType: ProductType
};

export const NoSearchResults: React.FC<Props> = ({ productType }) => {
  const categoryTitle = {
    [ProductType.PHONE]: 'Mobile phones',
    [ProductType.TABLET]: 'Tablets',
    [ProductType.ACCESSORY]: 'Accessories',
  };

  return (
    <section className="Page-NoResults NoResults">
      {`Not found ${categoryTitle[productType]} matching the query.`}
    </section>
  );
};
