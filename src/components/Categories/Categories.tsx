import './Categories.scss';
import { CategoryItem } from './components/CategoryItem';

const categories = {
  phones: '/_new/img/category-phones.png',
  tablets: '/img/category-tablets.png',
  accessories: '/img/category-accessories.png',
};

const categoriesArray = Object.entries(categories);

export const Categories = () => {
  return (
    <div className="categories">
      <div className="categories__upper">
        <h2 className="categories__title">Shop by category</h2>
      </div>

      <div className="categories__list">
        {categoriesArray.map(category => (
          <CategoryItem
            category={category[0]}
            link={process.env.PUBLIC_URL + category[1]}
          />
        ))}
      </div>
    </div>
  );
};
