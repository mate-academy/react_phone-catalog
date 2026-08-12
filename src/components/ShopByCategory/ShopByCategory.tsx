import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { useTranslation } from '../../hooks';
import type { ProductCategory, ProductFromServer } from '../../types/product';
import styles from './ShopByCategory.module.scss';

type Props = {
  products: ProductFromServer[];
};

type CategoryItem = {
  category: ProductCategory;
  path: string;
  image: string;
};

const categories: CategoryItem[] = [
  {
    category: 'phones',
    path: ROUTES.phones,
    image: 'img/category-phones.png',
  },
  {
    category: 'tablets',
    path: ROUTES.tablets,
    image: 'img/category-tablets.png',
  },
  {
    category: 'accessories',
    path: ROUTES.accessories,
    image: 'img/category-accessories.png',
  },
];

export const ShopByCategory = ({ products }: Props) => {
  const t = useTranslation();

  const getModelsCount = (category: ProductCategory) => {
    return products.filter(product => product.category === category).length;
  };

  const getCategoryTitle = (category: ProductCategory) => {
    switch (category) {
      case 'phones':
        return t.catalog.phonesTitle;

      case 'tablets':
        return t.catalog.tabletsTitle;

      case 'accessories':
        return t.catalog.accessoriesTitle;

      default:
        return '';
    }
  };

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>{t.home.shopByCategory}</h2>

      <div className={styles.list}>
        {categories.map(({ category, path, image }) => {
          const title = getCategoryTitle(category);
          const modelsCount = getModelsCount(category);
          const imageSrc = `${import.meta.env.BASE_URL}${image}`;

          return (
            <Link
              className={styles.card}
              to={path}
              key={category}
              aria-label={`${title}: ${modelsCount} ${
                modelsCount === 1 ? t.catalog.model : t.catalog.models
              }`}
            >
              <div className={styles.imageWrapper}>
                <img className={styles.image} src={imageSrc} alt="" />
              </div>

              <h3 className={styles.cardTitle}>{title}</h3>

              <p className={styles.count}>
                {modelsCount}{' '}
                {modelsCount === 1 ? t.catalog.model : t.catalog.models}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
