import React from 'react';
import styles from '../../ProductDetailsPage.module.scss'; // Використовуємо стилі основної сторінки
import skeletonStyles from './Skeleton.module.scss'; // Новий файл для ефекту анімації

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className={styles.product}>
      {/* 1. Блок з хлібними крихтами (Опціонально: часто не показують) */}
      <div
        className={skeletonStyles.skeleton}
        style={{ width: '30%', height: '14px', marginBottom: '24px' }}
      />

      {/* 2. Заголовок */}
      <div
        className={skeletonStyles.skeleton}
        style={{ width: '60%', height: '36px', marginBottom: '40px' }}
      />

      {/* 3. Основний контент (галерея, опції, опис, тех. характеристики) */}
      <div className={styles['product-content']}>
        {/* A. Галерея зображень */}
        <div className={styles['product-image-gallery']}>
          {/* Контейнер для прев'ю (вертикальна смуга) */}
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100px', height: '400px', marginRight: '16px' }}
          />
          {/* Контейнер головного зображення */}
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', minHeight: '400px' }}
          />
        </div>

        {/* B. Опції та ціна */}
        <div className={styles['product-options']}>
          {/* Смуги для кольорів/ємності */}
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', height: '20px', marginBottom: '10px' }}
          />
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', height: '20px', marginBottom: '32px' }}
          />

          {/* Ціна */}
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '50%', height: '30px', marginBottom: '16px' }}
          />

          {/* Кнопки */}
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '80%', height: '44px', borderRadius: '4px' }}
          />
        </div>

        {/* C. Опис (About) */}
        <div className={styles['product-about']}>
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '40%', height: '24px', marginBottom: '16px' }}
          />
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', height: '16px', marginBottom: '8px' }}
          />
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '90%', height: '16px', marginBottom: '8px' }}
          />
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', height: '16px' }}
          />
        </div>

        {/* D. Технічні характеристики */}
        <div className={styles['product-tech-specs']}>
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '50%', height: '24px', marginBottom: '16px' }}
          />
          {/* Лінії для характеристик */}
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', height: '18px', marginBottom: '8px' }}
          />
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', height: '18px', marginBottom: '8px' }}
          />
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', height: '18px' }}
          />
        </div>
      </div>
    </div>
  );
};
