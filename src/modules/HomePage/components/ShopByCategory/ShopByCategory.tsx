import { CategoryItem } from './components/CategoryItem';
import phonesData from '../../../../../public/api/phones.json';
import tabletsData from '../../../../../public/api/tablets.json';
import accessoriesData from '../../../../../public/api/accessories.json';

import styles from './ShopByCategory.module.scss';

const phonesCount = phonesData.length.toString();
const tabletsCount = tabletsData.length.toString();
const accessoriesCount = accessoriesData.length.toString();

export const ShopByCategory = () => {
  return (
    <section className={styles.catalog}>
      <h2 className={styles.catalog__header}>Shop by category</h2>

      <div className={styles.catalog__container}>
        <CategoryItem
          header="Mobile phones"
          image="img/category-phones.png"
          productsCount={phonesCount}
          linkTo="/phones"
        />

        <CategoryItem
          header="Tablets"
          image="img/category-tablets.png"
          productsCount={tabletsCount}
          linkTo="/tablets"
        />

        <CategoryItem
          header="Accessories"
          image="img/category-accessories.png"
          productsCount={accessoriesCount}
          linkTo="/accessories"
        />
      </div>
    </section>
  );
};
