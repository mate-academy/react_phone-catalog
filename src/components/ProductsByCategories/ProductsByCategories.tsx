import { FC } from 'react';
import { CategoryLink } from './CategoryLink';
import './ProductsByCategories.scss';

type Props = {
  phonesAmount: number;
  tabletsAmount: number;
  accessoriesAmount: number;
};

export const ProductsByCategories: FC<Props> = ({
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
        <CategoryLink
          url="/phones"
          imageUrl="./img/Phones_category.png"
          title="Mobile phones"
          amount={phonesAmount}
        />

        <CategoryLink
          url="/tablets"
          imageUrl="./img/Tablets_category.png"
          title="Tablets"
          amount={tabletsAmount}
        />

        <CategoryLink
          url="/accessories"
          imageUrl="./img/Accessories_category.png"
          title="Accessories"
          amount={accessoriesAmount}
        />
      </div>
    </div>
  );
};
