import { PRODUCT_CATEGORIES } from '@/modules/products/constants';

import { Catalog } from './Catalog';

export const Tablets = () => {
  return (
    <Catalog categoryName={'Tablets'} category={PRODUCT_CATEGORIES.tablets} />
  );
};
