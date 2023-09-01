import './Categories.scss';
import { CategoryItem } from './components/CategoryItem';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

const categories = {
  phones: '/img/category-phones.png',
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
            link={`${API_URL}${category[1]}`}
          />
        ))}
      </div>
    </div>
  );
};
