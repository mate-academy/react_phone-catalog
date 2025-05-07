import styles from './Categories.module.scss';
import { Category } from '../Category/Category';

import phonesCategory from '@assets/images/category-phones.png';
import tabletsCategory from '@assets/images/category-tablets.png';
import accessoriesCategory from '@assets/images/category-accessories.png';
// eslint-disable-next-line max-len
import { countProductsInCategory } from '../../../../utils/countProductsInCategory';
import { useAppSelector } from '../../../../store/hooks';

export const Categories = () => {
  const { products } = useAppSelector(state => state.products);

  const categories = [
    {
      path: '/phones',
      imgSrc: phonesCategory,
      counter: countProductsInCategory(products, 'phones'),
      name: 'Mobile phones',
    },
    {
      path: '/tablets',
      imgSrc: tabletsCategory,
      counter: countProductsInCategory(products, 'tablets'),
      name: 'Tablets',
    },
    {
      path: '/accessories',
      imgSrc: accessoriesCategory,
      counter: countProductsInCategory(products, 'accessories'),
      name: 'Accessories',
    },
  ];

  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>

      <div className={styles.categories__content}>
        {categories.map(({ counter, imgSrc, name, path }) => (
          <Category
            path={path}
            imgSrc={imgSrc}
            counter={counter}
            name={name}
            key={name}
          />
        ))}
      </div>
    </section>
  );
};
