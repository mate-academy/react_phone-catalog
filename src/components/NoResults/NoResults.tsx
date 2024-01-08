import { ProductType } from '../../types/ProductType';
import { getCategoryData } from '../../utils/getCategoryData';

import './NoResults.scss';

type Props = {
  productType: ProductType
};

export const NoResults: React.FC<Props> = ({ productType }) => {
  const { title } = getCategoryData(productType);

  return (
    <div className="Page-NoResults NoResults">
      {`${title} not found`}
    </div>
  );
};
