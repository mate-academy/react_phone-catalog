import { ProductType } from '../../types/ProductType';

import './NoResults.scss';

type Props = {
  productType: ProductType
};

export const NoResults: React.FC<Props> = ({ productType }) => {
  const categoryTitle = {
    [ProductType.PHONE]: 'Mobile phones',
    [ProductType.TABLET]: 'Tablets',
    [ProductType.ACCESSORY]: 'Accessories',
  };

  return (
    <section className="Page-NoResults NoResults">
      {`${categoryTitle[productType]} not found`}
    </section>
  );
};
