import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

interface Props {
  categoriesCount: {
    phones: number;
    tablets: number;
    accessories: number;
  };
}


export const ShopByCategory: React.FC<Props> = ({ categoriesCount }) => {
  return (
    // Головний Блок секції
    <section className={styles['category-shop']}>
      {/* Елемент: Заголовок */}
      <h2 className={styles['category-shop__title']}>Shop by category</h2>
      
      {/* Елемент: Список-Сітка для трьох карток */}
      <div className={styles['category-shop__list']}>
                {/* Картка 1: Мобільні телефони */}
        <Link to="/phones" className={styles['category-shop__item']}>
          <div className={styles['category-shop__img-container']}>
            <img 
              src="img/categories/phones.svg" 
              alt="Mobile phones" 
              className={styles['category-shop__img']} 
            />
          </div>
          <h4 className={styles['category-shop__name']}>Mobile phones</h4>
          <p className={styles['category-shop__count']}>
            {categoriesCount.phones} models
          </p>
        </Link>

        {/* Картка 2: Планшети */}
        <Link to="/tablets" className={styles['category-shop__item']}>
          <div className={styles['category-shop__img-container']}>
            <img 
              src="img/categories/tablets.svg" 
              alt="Tablets" 
              className={styles['category-shop__img']} 
            />
          </div>
          <h4 className={styles['category-shop__name']}>Tablets</h4>
          <p className={styles['category-shop__count']}>
            {categoriesCount.tablets} models
          </p>
        </Link>

        {/* Картка 3: Аксесуари */}
        <Link to="/accessories" className={styles['category-shop__item']}>
          <div className={styles['category-shop__img-container']}>
            <img 
              src="img/categories/watch.jpg" 
              alt="Accessories" 
              className={styles['category-shop__img']} 
            />
          </div>
          <h4 className={styles['category-shop__name']}>Accessories</h4>
          <p className={styles['category-shop__count']}>
            {categoriesCount.accessories} models
          </p>
        </Link>

      </div>
    </section>
  );
};
