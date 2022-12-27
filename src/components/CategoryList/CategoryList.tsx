import { FC } from 'react';
import { Title } from '../UI/Title';
import { Category } from './Category';
import './CategoryList.scss';

type Props = {
  count: {
    phonesCount: number,
    tabletsCount: number,
    accessoriesCount: number,
  };
};

export const CategoryList: FC<Props> = ({ count }) => {
  return (
    <div className="categories" data-cy="categoryLinksContainer">
      <div className="categories__header">
        <Title title="Shop by category" />
      </div>
      <div className="categories__container">
        <Category
          title="Mobile phones"
          description={`${count.phonesCount} models`}
          category="phones"
        />
        <Category
          title="Tablets"
          description={`${count.tabletsCount} models`}
          category="tablets"
        />
        <Category
          title="Accessories"
          description={`${count.accessoriesCount} models`}
          category="accessories"
        />
      </div>
    </div>
  );
};
