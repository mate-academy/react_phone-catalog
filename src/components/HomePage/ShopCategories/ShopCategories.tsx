import './ShopCategories.scss';
import { ShopCategory } from './ShopCategory';

const categories = [
  {
    imageUrl: '_new/img/category-phones.png',
    name: 'Mobile phones',
    count: 95,
    to: 'phones',
  },
  {
    imageUrl: '_new/img/category-tablets.png',
    name: 'Tablets',
    count: 95,
    to: 'tablets',
  },
  {
    imageUrl: '_new/img/category-accessories.png',
    name: 'Accessories',
    count: 95,
    to: 'accessories',
  },
];

export const ShopCategories = () => (
  <div className="shop-categories">
    <h1 className="shop-categories__title">Shop by category</h1>

    <div className="shop-categories__container">
      {categories.map(category => (
        <ShopCategory key={category.name} {...category} />
      ))}
    </div>
  </div>
);
