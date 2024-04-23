import { Link } from 'react-router-dom';
import styles from './ProductCategories.module.scss';
import { categories } from '../../../../helpers/constArrs';
// import { scrollToTop } from '../../../../helpers/scrollToTop';
import React from 'react';
import { ProductInfo } from '../../../../types/ProductInfo';

type Props = {
  phones: ProductInfo[];
  tablets: ProductInfo[];
  accessories: ProductInfo[];
};

export const ProductCategories: React.FC<Props> = ({
  phones,
  tablets,
  accessories,
}) => {
  const modelsAmount: { [key: string]: number } = {
    'Mobile phones': phones.length,
    Tablets: tablets.length,
    Accessories: accessories.length,
  };

  return (
    <section className={styles.productCategories}>
      <h2>Shop by category</h2>

      <div className={styles.catWrapper}>
        {categories.map(category => (
          <Link
            to={category.link}
            key={category.name}
            className={styles.category}
          >
            <div className={styles.categoryImgWrap}>
              <img
                src={category.image}
                alt={`category-${category.link}`}
                className={styles.categoryImg}
              />
            </div>
            <div className={styles.catTextWrapper}>
              <h3>{category.name}</h3>
              <h5 className={styles.cattH5}>
                {modelsAmount[category.name]} models
              </h5>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
