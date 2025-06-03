import { CategoryItem } from '../CategoryItem';
import phonesData from '../../../../../public/api/phones.json';
import tabletsData from '../../../../../public/api/tablets.json';
import accessoriesData from '../../../../../public/api/accessories.json';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const phonesCount = phonesData.length.toString();
  const tabletsCount = tabletsData.length.toString();
  const accessoriesCount = accessoriesData.length.toString();

  return (
    <div className={styles.catalog}>
      <h2 className={styles.catalog__header}>Shop by category</h2>
      <CategoryItem
        linkTo={'/phones'}
        header={'Mobile phones'}
        image={'public/img/category-phones.png'}
        productsCount={phonesCount}
      />
      <CategoryItem
        linkTo={'/tablets'}
        header={'Tablets'}
        image={'public/img/category-tablets.png'}
        productsCount={tabletsCount}
      />
      <CategoryItem
        linkTo={'/accessories'}
        header={'Accessories'}
        image={'public/img/category-accessories.png'}
        productsCount={accessoriesCount}
      />
    </div>
  );
};
