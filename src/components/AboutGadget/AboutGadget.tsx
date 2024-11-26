import React from 'react';
import cn from 'classnames';
import styles from './AboutGadget.module.scss';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails;
};

export const AboutGadget: React.FC<Props> = ({ product }) => {
  return (
    <section className={styles.about}>
      <div className={styles.about__desc}>
        <h3 className={styles.about__title}>About</h3>
        <div className={styles.about__line}></div>
        <div className={styles.about__content}>
          {product.description.map(desc => {
            const { title, text } = desc;

            return (
              <div key={title} className={styles.about__part}>
                <h4 className={styles.about__subtitle}>{title}</h4>
                <p className={styles.about__text}>{text}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles['about__tech-specs']}>
        <h3 className={styles.about__title}>Tech specs</h3>
        <div className={styles.about__line}></div>
        <div className={styles['about__info-details']}>
          <div className={styles.about__info}>
            <p className={cn(styles['about__info--name'])}>Screen</p>
            <p className={cn(styles['about__info--value'])}>{product.screen}</p>
          </div>

          <div className={styles.about__info}>
            <p className={cn(styles['about__info--name'])}>Resolution</p>
            <p className={cn(styles['about__info--value'])}>
              {product.resolution}
            </p>
          </div>

          <div className={styles.about__info}>
            <p className={cn(styles['about__info--name'])}>Processor</p>
            <p className={cn(styles['about__info--value'])}>
              {product.processor}
            </p>
          </div>

          <div className={styles.about__info}>
            <p className={cn(styles['about__info--name'])}>RAM</p>
            <p className={cn(styles['about__info--value'])}>{product.ram}</p>
          </div>

          <div className={styles.about__info}>
            <p className={cn(styles['about__info--name'])}>Built in memory</p>
            <p className={cn(styles['about__info--value'])}>
              {product.capacity}
            </p>
          </div>

          <div className={styles.about__info}>
            <p className={cn(styles['about__info--name'])}>Camera</p>
            <p className={cn(styles['about__info--value'])}>{product.camera}</p>
          </div>

          <div className={styles.about__info}>
            <p className={cn(styles['about__info--name'])}>Zoom</p>
            <p className={cn(styles['about__info--value'])}>{product.zoom}</p>
          </div>

          <div className={styles.about__info}>
            <p className={cn(styles['about__info--name'])}>Cell</p>
            <p className={cn(styles['about__info--value'])}>
              {product.cell.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
