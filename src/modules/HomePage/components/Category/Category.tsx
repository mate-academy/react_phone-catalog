import type { CategoryListType } from '../../types/CategoryListType';
import { CategoryList } from '../CategoryList';

import './Category.scss';

export const Category = ({ filtredCategory }: CategoryListType) => {
  return (
    <div className="category">
      <div className="wrapper">
        <div className="grid">
          <h4 className="home-section-title cat-section-title">
            Shop by category
          </h4>
          <CategoryList filtredCategory={filtredCategory} />
        </div>
      </div>
    </div>
  );
};
