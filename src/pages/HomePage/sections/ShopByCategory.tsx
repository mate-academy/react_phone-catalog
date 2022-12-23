import { FC } from 'react';
import { CategoryCard } from 'src/components/CategoryCard';
import { Category } from 'src/types/Category';
import { Product } from 'src/types/Product';

type Props = {
  products: Product[],
};

export const ShopByCategory: FC<Props> = ({ products }) => {
  const mobilesCount = products.filter(el => el.type === 'phone').length;
  const tabletsCount = products.filter(el => el.type === 'tablet').length;
  const accessoriesCount = products
    .filter(el => el.type === 'accessory').length;

  const categoriesData: Category[] = [
    {
      imageUrl: 'phones.png',
      name: 'Mobile Phones',
      itemsLeft: mobilesCount,
      backgrondColor: '#FCDBC1',
      id: 1,
    },
    {
      imageUrl: 'tablets.png',
      name: 'Tablets',
      itemsLeft: tabletsCount,
      backgrondColor: '#8D8D92',
      id: 2,
    },
    {
      imageUrl: 'accessories.png',
      name: 'Accessories',
      itemsLeft: accessoriesCount,
      backgrondColor: '#D53C51',
      id: 3,
    },
  ];

  return (
    <div className="shop-by-category phones-section">
      <div className="shop-by-category__title">
        <h1>Shop by category</h1>
      </div>

      <div className="shop-by-category__content">
        {categoriesData.map(category => {
          return (
            <CategoryCard
              key={category.id}
              category={category}
            />
          );
        })}
      </div>
    </div>
  );
};
