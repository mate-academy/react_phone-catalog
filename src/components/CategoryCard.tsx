import { FC } from 'react';
import { Category } from '../types/Category';

type Props = {
  category: Category,
};

export const CategoryCard: FC<Props> = ({ category }) => {
  return (
    <div className="shop-by-category__card">
      <div
        className="shop-by-category__background"
        style={{ background: category.backgrondColor }}
      >
        <img
          className="shop-by-category__background__image"
          src={require(`../assets/img/categories/${category.imageUrl}`).default}
          alt=""
        />
        <div className="shop-by-category__overlay icon" />
      </div>

      <div className="shop-by-category__desc">
        <h3>{category.name}</h3>
      </div>

      <div className="shop-by-category__models-quantity">
        {category.itemsLeft === 0
          ? 'No items left'
          : `${category.itemsLeft} left`}
      </div>
    </div>
  );
};
