import { categories } from '../../types/navigate';
import { CategoryLink } from '../CategoryLink';

import './style.scss';

export const ShopByCategory: React.FC = () => {
  return (
    <>
      <h3 className="block-header__title">
        Shop by category
      </h3>
      <div
        className="shopByCategory categories"
      >
        <ul
          className="categories__list list"
          data-cy="categoryLinksContainer"
        >
          {categories.map((category) => (
            <li className="list__item item" key={category.title}>
              <CategoryLink category={category} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
