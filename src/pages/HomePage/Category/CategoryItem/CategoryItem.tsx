import { Link } from 'react-router-dom';
import { Categories } from '../../../../hooks/useCategories';

import '../Category.scss';
import { useFilteredProducts } from '../../../../hooks/useFilteredProducts';

type Props = {
  categoryData: Categories;
};

export const CategoryItem: React.FC<Props> = ({ categoryData }) => {
  const { products } = useFilteredProducts(categoryData.category);

  return (
    <div className="category__item">
      <Link to={`/${categoryData.category}`} className="category__item-link">
        <div
          className="category__item-wrapper"
          style={{ backgroundColor: categoryData.color }}
        >
          <img
            src={categoryData.url}
            alt={categoryData.alt}
            className="category__item--img"
          />
        </div>
      </Link>

      <div className="category__info">
        <h4 className="category__info--title">{categoryData.title}</h4>

        <p className="category__info--subtitle text-gray">{`${products.length} models`}</p>
      </div>
    </div>
  );
};
