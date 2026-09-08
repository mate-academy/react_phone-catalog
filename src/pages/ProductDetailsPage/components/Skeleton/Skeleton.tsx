import React from 'react';
import styles from '../../ProductDetailsPage.module.scss'; // Використовуємо стилі основної сторінки
import skeletonStyles from './Skeleton.module.scss'; // Новий файл для ефекту анімації
import classNames from 'classnames';

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className={styles.product}>
      {/* 2. Заголовок */}
      <div
        className={skeletonStyles.skeleton}
        style={{
          width: '60%',
          height: '36px',
          marginTop: '24px',
          marginBottom: '40px',
        }}
      />

      {/* 3. Основний контент (галерея, опції, опис, тех. характеристики) */}
      <div className={styles['product-content']}>
        {/* A. Галерея зображень */}
        <div
          className={classNames(
            styles['product-image-gallery'],
            skeletonStyles['product-gallery'],
          )}
        >
          {/* Контейнер для прев'ю (вертикальна смуга) */}
          <div
            className={classNames(
              skeletonStyles.skeleton,
              skeletonStyles['product-gallery__thumbnails'],
            )}
          />
          {/* Контейнер головного зображення */}
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', minHeight: '400px' }}
          />
        </div>

        {/* B. Опції та ціна */}
        <div className={styles['product-options-wrapper']}>
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
        </div>

        {/* C. Опис (About) */}
        <div className={styles['product-about']}>
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '40%', height: '24px', marginBottom: '16px' }}
          />

          <div className={skeletonStyles.divider}></div>

          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', height: '16px', marginBottom: '8px' }}
          />
          <div
            className={skeletonStyles.skeleton}
            style={{ width: '100%', height: '16px', marginBottom: '8px' }}
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

          <div className={skeletonStyles.divider}></div>

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
