import { FC } from 'react';
import { Category } from '../Category/Category';
import './shopByCategory.scss';

const models = [
  {
    source: '/_new/img/category-phones.png',
    title: 'Mobile phones',
    quantity: 95,
  },
  {
    source: '/_new/img/category-tablets.png',
    title: 'Tablets',
    quantity: 0,
  },
  {
    source: '/_new/img/category-accessories.png',
    title: 'Accessories',
    quantity: 0,
  },
];

export const ShopByCategory: FC = () => {
  return (
    <div className="shop-by-category">
      <h1>Shop by category</h1>

      <div className="shop-by-category__categories">
        {models.map(({ source, title, quantity }) => (
          <Category
            key={source}
            source={source}
            title={title}
            quantity={quantity}
          />
        ))}
      </div>
    </div>
  );
};
