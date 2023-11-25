import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Category } from '../Category/Category';
import './shopByCategory.scss';

const models = [
  {
    source: 'new/img/category-phones.png',
    title: 'Mobile phones',
    quantity: 95,
  },
  {
    source: 'new/img/category-tablets.png',
    title: 'Tablets',
    quantity: 0,
  },
  {
    source: 'new/img/category-accessories.png',
    title: 'Accessories',
    quantity: 0,
  },
];

export const ShopByCategory: FC = () => {
  const theme = useAppSelector(state => state.theme.value);

  return (
    <div className="shop-by-category">
      <h1 className={`title title--${theme}`}>
        Shop by category
      </h1>

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
