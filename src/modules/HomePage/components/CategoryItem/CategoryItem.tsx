import { Link } from 'react-router-dom';
import { CategoryitemType } from '../../types/CategoryitemType';

import './CategoryItem.scss';

export const CategoryItem = ({ name, total, img }: CategoryitemType) => {
  return (
    <div className="category-block">
      <Link to={`/${name}`}>
        <img src={img} alt="" className="category-img" />
        <div className="category-bottom">
          <h6 className="category-title">{name}</h6>
          <span className="category-count-text">{total} models</span>
        </div>
      </Link>
    </div>
  );
};
