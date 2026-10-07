import styles from './ShopByCategory.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const getCategory = (type: string) =>
    products.filter(p => p.category === type).length;

  const categories = [
    {
      title: 'Mobile phones',
      path: '/phones',
      img: '/img/category-phones.webp',
      type: 'phones',
      allModel: getCategory('phones'),
    },
    {
      title: 'Tablets',
      path: '/tablets',
      img: '/img/category-tablets.png',
      type: 'tablets',
      allModel: getCategory('tablets'),
    },
    {
      title: 'Accessories',
      path: '/accessories',
      img: '/img/category-accessories.png',
      type: 'accessories',
      allModel: getCategory('accessories'),
    },
  ];

  return (
    <section className={styles.shop_by_category}>
      <h2 className={styles.shop_by_category__title}>Shop by category</h2>

      <div className={styles.shop_by_category__grid}>
        {categories.map(({ title, path, img, type, allModel }) => (
          <div key={type} className={styles.shop_by_category__category}>
            <Link to={path} className={styles.shop_by_category__link}>
              <div
                className={`${styles.shop_by_category__category__pictures} ${styles[`shop_by_category__category__pictures__${type}`]}`}
              >
                <img
                  className={`${styles.shop_by_category__category__img} ${styles[`shop_by_category__category__img__${type}`]}`}
                  src={img}
                  alt={title}
                />
              </div>
              <h3 className={styles.shop_by_category__category__title}>
                {title}
              </h3>
              <p className={styles.shop_by_category__category__text}>
                {allModel} models
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
