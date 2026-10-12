import { PRODUCT_CATEGORIES } from '@/modules/products/constants';

import { Catalog } from './Catalog';

export const Accessories = () => {
  return (
    <Catalog
      categoryName={'Accessories'}
      category={PRODUCT_CATEGORIES.accessories}
    />
  );
};
