import { FC } from 'react';
import { Title } from './UI/Title';
import { Category } from './Category';

export const CategoryList: FC = () => {
  return (
    <div className="categories" data-cy="categoryLinksContainer">
      <div className="categories__header">
        <Title title="Shop by category" />
      </div>
      <div className="categories__container">
        <Category
          title="Mobile phones"
          description="95 models"
          category="phones"
        />
        <Category
          title="Tablets"
          description="24 models"
          category="tablets"
        />
        <Category
          title="Accessories"
          description="100 models"
          category="accessories"
        />
      </div>
    </div>
  );
};
