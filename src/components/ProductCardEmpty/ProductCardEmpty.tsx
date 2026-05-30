import classNames from 'classnames';
import styles from './ProductCardEmpty.module.scss';

export const ProductCardEmpty = () => {
  return (
    <div className={styles['product-card']}>
      <div
        className={classNames(
          styles['product-card__image-container'],
          styles.skeleton,
        )}
      ></div>

      <div className={styles['product-card__main-info']}>
        <p
          className={classNames(styles['product-card__title'], styles.skeleton)}
        ></p>

        {/* Ціна */}
        <div
          className={styles.skeleton}
          style={{ width: '100%', height: '32px', marginBottom: '8px' }}
        />

        <div className={styles['product-card__divider']}></div>

        {/* D. Технічні характеристики */}
        <div>
          {/* Лінії для характеристик */}
          <div
            className={styles.skeleton}
            style={{ width: '100%', height: '12px', marginBottom: '8px' }}
          />
          <div
            className={styles.skeleton}
            style={{ width: '100%', height: '12px', marginBottom: '8px' }}
          />
          <div
            className={styles.skeleton}
            style={{ width: '100%', height: '12px', marginBottom: '16px' }}
          />
        </div>

        {/* Кнопки */}
        <div
          className={styles.skeleton}
          style={{ width: '100%', height: '44px', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};
