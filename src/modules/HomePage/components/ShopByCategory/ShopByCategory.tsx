import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsByCategory } from '../../../shared/api/products';
import type { ProductCategory } from '../../../shared/types/Product';
import styles from './ShopByCategory.module.scss';
import { assetUrl } from '../../../shared/utils';

interface CategoryData {
  id: ProductCategory;
  label: string;
  image: string;
  color: string;
  count: number;
}

const CATEGORIES: Omit<CategoryData, 'count'>[] = [
  {
    id: 'phones',
    label: 'Mobile phones',
    image: 'img/category-phones.png',
    color: '#6d6474',
  },
  {
    id: 'tablets',
    label: 'Tablets',
    image: 'img/category-tablets.png',
    color: '#8d8d92',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    image: 'img/category-accessories.png',
    color: '#973d5f',
  },
];

export function ShopByCategory(): JSX.Element {
  const [categories, setCategories] = useState<CategoryData[]>(
    CATEGORIES.map(cat => ({ ...cat, count: 0 })),
  );

  useEffect(() => {
    const loadCounts = async () => {
      const counts = await Promise.all(
        CATEGORIES.map(cat =>
          getProductsByCategory(cat.id).then(products => ({
            id: cat.id,
            count: products.length,
          })),
        ),
      );

      setCategories(prev =>
        prev.map(cat => ({
          ...cat,
          count: counts.find(c => c.id === cat.id)?.count ?? 0,
        })),
      );
    };

    loadCounts();
  }, []);

  return (
    <section
      className={styles.section}
      aria-labelledby="shop-by-category-heading"
    >
      <h2 id="shop-by-category-heading" className={styles.title}>
        Shop by category
      </h2>
      <div className={styles.grid}>
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/${category.id}`}
            className={styles.categoryLink}
            aria-label={`${category.label}, ${category.count} models`}
          >
            <div
              className={styles.categoryImageWrapper}
              style={{ backgroundColor: category.color }}
            >
              <img
                src={assetUrl(category.image)}
                alt=""
                className={styles.categoryImage}
                loading="lazy"
              />
            </div>
            <div className={styles.categoryInfo}>
              <h3 className={styles.categoryName}>{category.label}</h3>
              <p className={styles.categoryCount}>{category.count} models</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
