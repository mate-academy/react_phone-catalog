import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

// Definição dos dados para as categorias
interface Category {
  name: string;
  models: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    name: 'Mobile phones',
    models: '95 models',
    image: 'img/category-phones.png',
    link: '/phones',
  },
  {
    name: 'Tablets',
    models: '24 models',
    image: 'img/category-tablets.png',
    link: '/tablets',
  },
  {
    name: 'Accessories',
    models: '100 models',
    image: 'img/category-accessories.png',
    link: '/accessories',
  },
];

const ShopByCategory: React.FC = () => {
  return (
    <section className={styles.shopByCategorySection}>
      <h2 className={styles.shopByCategoryTitle}>Shop by category</h2>
      <div className={styles.shopCategoryList}>
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className={styles.shopCategoryCard}>
            <div className={styles.imageContainer}>
              <img 
                src={category.image} 
                alt={category.name} 
                className={styles.shopCategoryImage} 
              />
            </div>
            <div className={styles.categoryInfo}>
              <h3 className={styles.shopCategoryName}>{category.name}</h3>
              <p className={styles.shopCategoryModels}>{category.models}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;