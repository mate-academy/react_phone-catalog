import { Link } from 'react-router-dom';
import './Categories.scss';

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
        <h2 className="categories__title">shop by category</h2>
      </div>

      <div className="categories__list">
        {categoriesArray.map(category => (
          <Link
            to={category[0]}
            key={category[0]}
          >
            <img
              className="categories__img"
              alt={category[0]}
              src={category[1]}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
