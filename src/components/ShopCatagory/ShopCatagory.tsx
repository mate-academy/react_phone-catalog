import { FC } from 'react';

import './ShopCatagory.scss';
import { Category } from './Category';
import { ShopCatagoryType } from '../../types/ShopCategory';

type Props = {
  shopCategoryInfo: ShopCatagoryType[];
};

export const ShopCatagory: FC<Props> = ({ shopCategoryInfo }) => {
  return (
    <section className="shop-category">
      <div className="container">
        <h2 className="shop-category__title">Shop by category</h2>
        <div className="shop-category__wrapper">
          {shopCategoryInfo.map(category => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
