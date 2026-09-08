import { FC } from 'react';
import cn from 'classnames';
import { Phone } from '../../../shared/types/Phone';
import styles from './ProductInfo.module.scss';

type Props = {
  currentProduct: Phone;
};

export const ProductInfo: FC<Props> = ({ currentProduct }) => (
  <div className={styles['product-info']}>
    <section className={styles['product-info__about']}>
      <h3 className={styles['product-info__title']}>About</h3>

      <div className={styles['product-info__description-container']}>
        <div className={styles['product-info__line']}></div>

        {currentProduct?.description.map((desc, i) => (
          <article key={i} className={styles['product-info__description']}>
            <h4 className={styles['product-info__description-title']}>
              {desc.title}
            </h4>

            <p className={styles['product-info__description-text']}>
              {desc.text}
            </p>
          </article>
        ))}
      </div>
    </section>

    <section className={styles['product-info__tech-specs']}>
      <h3 className={styles['product-info__title']}>Tech specs</h3>

      <div className={styles['product-info__line']}></div>

      <article className={styles['product-info__properties']}>
        <div className={styles['product-info__property']}>
          <span
            className={cn(
              styles['product-info__name'],
              styles['product-info__name--big'],
            )}
          >
            Screen
          </span>

          <span
            className={cn(
              styles['product-info__value'],
              styles['product-info__value--big'],
            )}
          >
            {currentProduct?.screen}
          </span>
        </div>

        <div className={styles['product-info__property']}>
          <span
            className={cn(
              styles['product-info__name'],
              styles['product-info__name--big'],
            )}
          >
            Resolution
          </span>

          <span
            className={cn(
              styles['product-info__value'],
              styles['product-info__value--big'],
            )}
          >
            {currentProduct?.resolution}
          </span>
        </div>

        <div className={styles['product-info__property']}>
          <span
            className={cn(
              styles['product-info__name'],
              styles['product-info__name--big'],
            )}
          >
            Processor
          </span>

          <span
            className={cn(
              styles['product-info__value'],
              styles['product-info__value--big'],
            )}
          >
            {currentProduct?.processor}
          </span>
        </div>

        <div className={styles['product-info__property']}>
          <span
            className={cn(
              styles['product-info__name'],
              styles['product-info__name--big'],
            )}
          >
            RAM
          </span>

          <span
            className={cn(
              styles['product-info__value'],
              styles['product-info__value--big'],
            )}
          >
            {currentProduct?.ram}
          </span>
        </div>

        <div className={styles['product-info__property']}>
          <span
            className={cn(
              styles['product-info__name'],
              styles['product-info__name--big'],
            )}
          >
            Built in memory
          </span>

          <span
            className={cn(
              styles['product-info__value'],
              styles['product-info__value--big'],
            )}
          >
            {currentProduct?.ram}
          </span>
        </div>

        <div className={styles['product-info__property']}>
          <span
            className={cn(
              styles['product-info__name'],
              styles['product-info__name--big'],
            )}
          >
            Camera
          </span>

          <span
            className={cn(
              styles['product-info__value'],
              styles['product-info__value--big'],
            )}
          >
            {currentProduct?.camera}
          </span>
        </div>

        <div className={styles['product-info__property']}>
          <span
            className={cn(
              styles['product-info__name'],
              styles['product-info__name--big'],
            )}
          >
            Zoom
          </span>

          <span
            className={cn(
              styles['product-info__value'],
              styles['product-info__value--big'],
            )}
          >
            {currentProduct?.zoom}
          </span>
        </div>

        <div className={styles['product-info__property']}>
          <span
            className={cn(
              styles['product-info__name'],
              styles['product-info__name--big'],
            )}
          >
            Cell
          </span>

          <span
            className={cn(
              styles['product-info__value'],
              styles['product-info__value--big'],
            )}
          >
            {currentProduct?.cell.join(', ')}
          </span>
        </div>
      </article>
    </section>
  </div>
);
