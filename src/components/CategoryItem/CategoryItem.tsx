import { useContext } from 'react';
import { Category } from '../../types/product';
import './CategoryItem.scss';
import { StateContext } from '../../store/State';

type Props = {
  category: Category;
};

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const { allProducts } = useContext(StateContext);
  const quantity = allProducts.filter(product => {
    return product.type === category.category;
  }).length;

  return (
    <article className="category-item">
      <div className="category-item__wrapper">
        <img
          src={category.img}
          alt={category.title}
          className="category-item__img"
        />
      </div>

      <h3>{category.title}</h3>
      <p className="category-item__quantity">{`${quantity} models`}</p>
    </article>
  );
};
