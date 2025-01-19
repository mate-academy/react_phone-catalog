import React from 'react';
import cn from 'classnames';
import styles from './AboutGadget.module.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductError } from '../Errors/ProductError';

type Props = {
  gadget: ProductDetails | null;
};

export const AboutGadget: React.FC<Props> = ({ gadget }) => {
  return (
    <section className={styles.about}>
      {gadget ? (
        <>
          <div className={styles.about__desc}>
            <h3 className={styles.about__title}>About</h3>
            <div className={styles.about__line}></div>
            <div className={styles.about__content}>
              {gadget.description.map(desc => {
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
                <p className={cn(styles['about__info--value'])}>
                  {gadget.screen}
                </p>
              </div>

              <div className={styles.about__info}>
                <p className={cn(styles['about__info--name'])}>Resolution</p>
                <p className={cn(styles['about__info--value'])}>
                  {gadget.resolution}
                </p>
              </div>

              <div className={styles.about__info}>
                <p className={cn(styles['about__info--name'])}>Processor</p>
                <p className={cn(styles['about__info--value'])}>
                  {gadget.processor}
                </p>
              </div>

              <div className={styles.about__info}>
                <p className={cn(styles['about__info--name'])}>RAM</p>
                <p className={cn(styles['about__info--value'])}>{gadget.ram}</p>
              </div>

              <div className={styles.about__info}>
                <p className={cn(styles['about__info--name'])}>
                  Built in memory
                </p>
                <p className={cn(styles['about__info--value'])}>
                  {gadget.capacity}
                </p>
              </div>

              <div className={styles.about__info}>
                <p className={cn(styles['about__info--name'])}>Camera</p>
                <p className={cn(styles['about__info--value'])}>
                  {gadget.camera}
                </p>
              </div>

              <div className={styles.about__info}>
                <p className={cn(styles['about__info--name'])}>Zoom</p>
                <p className={cn(styles['about__info--value'])}>
                  {gadget.zoom}
                </p>
              </div>

              <div className={styles.about__info}>
                <p className={cn(styles['about__info--name'])}>Cell</p>
                <p className={cn(styles['about__info--value'])}>
                  {gadget.cell.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ProductError />
        </>
      )}
    </section>
  );
};
