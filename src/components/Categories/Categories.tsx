import { FC } from 'react';
import { Product } from '../../types/Product';
import { Category } from '../Category/Category';

import './Categories.scss';

type Props = {
  products: Product[],
};

export const Categories: FC<Props> = ({ products }) => {
  const countPhones = products
    .filter(product => product.category === 'phones').length;

  const countTablets = products
    .filter(product => product.category === 'tablets').length;

  const countAccessories = products
    .filter(product => product.category === 'accessories').length;

  return (
    <div className="categories container">
      <h2 className="categories__title">Shop by category</h2>

      <div className="categories__content" data-cy="categoryLinksContainer">
        <Category
          name="Mobile phones"
          srcImage="new/img/category-phones.png"
          count={countPhones}
        />

        <Category
          name="Tablets"
          srcImage="new/img/category-tablets.png"
          count={countTablets}
        />

        <Category
          name="Accessories"
          srcImage="new/img/category-accessories.png"
          count={countAccessories}
        />
      </div>
    </div>
  );
};
