import './Categories.scss';
import { CategoryItem } from './components/CategoryItem';

const categories = {
  phones: '_new/img/category-phones.png',
  tablets: '_new/img/category-tablets.png',
  accessories: '_new/img/category-accessories.png',
};

const categoriesArray = Object.entries(categories);

export const Categories = () => {
  return (
    <div className="categories">
      <div className="categories__upper">
        <h2 className="categories__title">Shop by category</h2>
      </div>

      <div
        className="categories__list"
        data-cy="categoryLinksContainer"
      >
        {categoriesArray.map(category => (
          <CategoryItem
            key={category[0]}
            category={category[0]}
            link={category[1]}
          />
        ))}
      </div>
    </div>
  );
};
