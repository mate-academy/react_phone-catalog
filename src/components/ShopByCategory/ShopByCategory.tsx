import { Category } from '../Category';
import { ProductType } from '../../types/ProductType';

import './ShopByCategory.scss';

export const ShopByCategory = () => {
  return (
    <div className="ShopByCategory">
      <h2 className="ShopByCategory-Title SectionTitle">
        Shop by category
      </h2>

      <div
        className="ShopByCategory-Content"
        data-cy="categoryLinksContainer"
      >
        <Category productType={ProductType.PHONE} />

        <Category productType={ProductType.TABLET} />

        <Category productType={ProductType.ACCESSORY} />
      </div>
    </div>
  );
};
