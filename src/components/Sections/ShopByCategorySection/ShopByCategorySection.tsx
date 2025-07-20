import { type FC } from 'react';
import { Link } from 'react-router-dom';

import phonesBanner from '/img/category-phones.png';
import tabletsBanner from '/img/category-tablets.png';
import accessoriesBanner from '/img/category-accessories.png';

import styles from './ShopByCategorySection.module.scss';
import { useFetchProducts } from '../../../hooks/useFetchProducts';

type CategoryType = 'phones' | 'tablets' | 'accessories';

type categoryButtonItem = {
  category: CategoryType;
  label: string;
  image: string;
};

const CategoryButtons: categoryButtonItem[] = [
  {
    category: 'phones',
    label: 'Mobile phones',
    image: phonesBanner,
  },
  {
    category: 'tablets',
    label: 'Tablets',
    image: tabletsBanner,
  },
  {
    category: 'accessories',
    label: 'Accessories',
    image: accessoriesBanner,
  },
];

export const ShopByCategorySection: FC = () => {
  const { products } = useFetchProducts();

  const getCategoryCount = (categoryName: CategoryType): number => {
    return products.filter((product) => product.category === categoryName)
      .length;
  };

  return (
    <section className={styles.shopByCategorySection}>
      <h2 className={styles.sectionTitle}>Shop by category</h2>
      <div className={styles.content}>
        {CategoryButtons.map(({ category, label, image }) => {
          const count = getCategoryCount(category);

          return (
            <Link
              key={category}
              to={category}
              className={styles.categoryLink}
            >
              <article className={styles.categoryCard}>
                <div className={styles.categoryImageBox}>
                  <img
                    src={image}
                    alt={label}
                    className={styles.categoryImage}
                  />
                </div>

                <div className={styles.categoryTextBox}>
                  <h3 className={styles.categoryTitle}>{label}</h3>
                  <p className={styles.categoryModelsCounter}>
                    {`${count} models`}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
