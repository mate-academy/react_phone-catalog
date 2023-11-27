import { FC } from 'react';

import { CategoriesLink } from '../CategoriesLink/CategoriesLink';

import './ShopByCategories.scss';

type Props = {
  phonesAmount: number;
  tabletsAmount: number;
  accessoriesAmount: number;
};

export const ShopByCategories: FC<Props> = ({
  phonesAmount,
  tabletsAmount,
  accessoriesAmount,
}) => {
  return (
    <div className="categories home-page__section">
      <h2 className="categories__title">Shop by category</h2>

      <div
        className="categories__links"
        data-cy="categoryLinksContainer"
      >
        <CategoriesLink
          url="/phones"
          imageUrl="_new/img/category-phones.png"
          title="Mobile phones"
          amount={phonesAmount}
        />

        <CategoriesLink
          url="/tablets"
          imageUrl="_new/img/category-tablets.png"
          title="Tablets"
          amount={tabletsAmount}
        />

        <CategoriesLink
          url="/accessories"
          imageUrl="_new/img/category-accessories.png"
          title="Accessories"
          amount={accessoriesAmount}
        />
      </div>
    </div>
  );
};
