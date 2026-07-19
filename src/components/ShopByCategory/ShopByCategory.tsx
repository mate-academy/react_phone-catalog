import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Product, ProductCategory } from '../../types/Product';

import styles from './ShopByCategory.module.scss';

type Props = {
  products: Product[];
};

type CategoryItem = {
  id: ProductCategory;
  title: string;
  path: string;
  image: string;
  imageBoxClassName: string;
  imageClassName: string;
};

const imageSrc = (imagePath: string) => {
  return `${import.meta.env.BASE_URL}${imagePath}`;
};

const categories: CategoryItem[] = [
  {
    id: 'phones',
    title: 'Mobile phones',
    path: '/phones',
    image: 'img/category-phones.webp',
    imageBoxClassName: styles.phonesImageBox,
    imageClassName: styles.phonesImage,
  },
  {
    id: 'tablets',
    title: 'Tablets',
    path: '/tablets',
    image: 'img/category-tablets.png',
    imageBoxClassName: styles.tabletsImageBox,
    imageClassName: styles.tabletsImage,
  },
  {
    id: 'accessories',
    title: 'Accessories',
    path: '/accessories',
    image: 'img/category-accessories.png',
    imageBoxClassName: styles.accessoriesImageBox,
    imageClassName: styles.accessoriesImage,
  },
];

export const ShopByCategory = ({ products }: Props) => {
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      phones: 0,
      tablets: 0,
      accessories: 0,
    };

    products.forEach(product => {
      counts[product.category] += 1;
    });

    return counts;
  }, [products]);

  return (
    <section
      className={styles.section}
      aria-labelledby="shop-by-category-title"
    >
      <h2 id="shop-by-category-title" className={styles.title}>
        Shop by category
      </h2>

      <div className={styles.categories}>
        {categories.map(category => (
          <Link
            key={category.id}
            to={category.path}
            className={styles.category}
          >
            <div className={`${styles.imageBox} ${category.imageBoxClassName}`}>
              <img
                src={imageSrc(category.image)}
                alt=""
                className={`${styles.image} ${category.imageClassName}`}
                aria-hidden="true"
              />
            </div>

            <h3 className={styles.categoryTitle}>{category.title}</h3>

            <p className={styles.modelsCount}>
              {categoryCounts[category.id]} models
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
