import { CategoryCard } from 'components/CategoryCard';
import { Category } from 'types/Category';

const categoriesData: Category[] = [
  {
    imageUrl: 'phones.png',
    name: 'Mobile Phones',
    itemsLeft: 0,
    backgrondColor: '#FCDBC1',
    id: 1,
  },
  {
    imageUrl: 'tablets.png',
    name: 'Tablets',
    itemsLeft: 4,
    backgrondColor: '#8D8D92',
    id: 2,
  },
  {
    imageUrl: 'accessories.png',
    name: 'Accessories',
    itemsLeft: 12,
    backgrondColor: '#D53C51',
    id: 3,
  },
];

export const ShopByCategory = () => {
  return (
    <div className="shop-by-category phones-section">
      <div className="shop-by-category__title">
        <h1>Shop by category</h1>
      </div>

      <div className="shop-by-category__content">
        {categoriesData.map(category => {
          return (
            <CategoryCard key={category.id} category={category} />
          );
        })}
      </div>
    </div>
  );
};
