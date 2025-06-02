import { CategoryItem } from '../CategoryItem';
import phonesData from '../../../../../public/api/phones.json';
import tabletsData from '../../../../../public/api/tablets.json';
import accessoriesData from '../../../../../public/api/accessories.json';

export const ShopByCategory = () => {
  const phonesCount = phonesData.length.toString();
  const tabletsCount = tabletsData.length.toString();
  const accessoriesCount = accessoriesData.length.toString();

  return (
    <div>
      <CategoryItem
        header={'Mobile phones'}
        image={'public/img/category-phones.png'}
        productsCount={phonesCount}
      />
      <CategoryItem
        header={'Tablets'}
        image={'public/img/category-tablets.png'}
        productsCount={tabletsCount}
      />
      <CategoryItem
        header={'Accessories'}
        image={'public/img/category-accessories.png'}
        productsCount={accessoriesCount}
      />
    </div>
  );
};
