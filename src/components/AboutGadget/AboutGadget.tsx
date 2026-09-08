import React, { useContext } from 'react';
import cn from 'classnames';
import styles from './AboutGadget.module.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductError } from '../Errors/ProductError';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';

type Props = {
  gadget: ProductDetails | null;
};

export const AboutGadget: React.FC<Props> = ({ gadget }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={styles.about}>
      {gadget ? (
        <>
          <div className={styles.about__desc}>
            <h3
              className={cn({
                [styles.about__title]: theme === Theme.Light,
                [styles['about__title-dark']]: theme === Theme.Dark,
              })}
            >
              About
            </h3>
            <div
              className={cn({
                [styles.about__line]: theme === Theme.Light,
                [styles['about__line-dark']]: theme === Theme.Dark,
              })}
            ></div>
            <div className={styles.about__content}>
              {gadget.description.map(desc => {
                const { title, text } = desc;

                return (
                  <div key={title} className={styles.about__part}>
                    <h4
                      className={cn({
                        [styles.about__subtitle]: theme === Theme.Light,
                        [styles['about__subtitle-dark']]: theme === Theme.Dark,
                      })}
                    >
                      {title}
                    </h4>
                    <p
                      className={cn({
                        [styles.about__text]: theme === Theme.Light,
                        [styles['about__text-dark']]: theme === Theme.Dark,
                      })}
                    >
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles['about__tech-specs']}>
            <h3
              className={cn({
                [styles.about__title]: theme === Theme.Light,
                [styles['about__title-dark']]: theme === Theme.Dark,
              })}
            >
              Tech specs
            </h3>
            <div
              className={cn({
                [styles.about__line]: theme === Theme.Light,
                [styles['about__line-dark']]: theme === Theme.Dark,
              })}
            ></div>
            <div className={styles['about__info-details']}>
              <div className={styles.about__info}>
                <p
                  className={cn({
                    [styles['about__info--name']]: theme === Theme.Light,
                    [styles['about__info--name-dark']]: theme === Theme.Dark,
                  })}
                >
                  Screen
                </p>
                <p
                  className={cn({
                    [styles['about__info--value']]: theme === Theme.Light,
                    [styles['about__info--value-dark']]: theme === Theme.Dark,
                  })}
                >
                  {gadget.screen}
                </p>
              </div>

              <div className={styles.about__info}>
                <p
                  className={cn({
                    [styles['about__info--name']]: theme === Theme.Light,
                    [styles['about__info--name-dark']]: theme === Theme.Dark,
                  })}
                >
                  Resolution
                </p>
                <p
                  className={cn({
                    [styles['about__info--value']]: theme === Theme.Light,
                    [styles['about__info--value-dark']]: theme === Theme.Dark,
                  })}
                >
                  {gadget.resolution}
                </p>
              </div>

              <div className={styles.about__info}>
                <p
                  className={cn({
                    [styles['about__info--name']]: theme === Theme.Light,
                    [styles['about__info--name-dark']]: theme === Theme.Dark,
                  })}
                >
                  Processor
                </p>
                <p
                  className={cn({
                    [styles['about__info--value']]: theme === Theme.Light,
                    [styles['about__info--value-dark']]: theme === Theme.Dark,
                  })}
                >
                  {gadget.processor}
                </p>
              </div>

              <div className={styles.about__info}>
                <p
                  className={cn({
                    [styles['about__info--name']]: theme === Theme.Light,
                    [styles['about__info--name-dark']]: theme === Theme.Dark,
                  })}
                >
                  RAM
                </p>
                <p
                  className={cn({
                    [styles['about__info--value']]: theme === Theme.Light,
                    [styles['about__info--value-dark']]: theme === Theme.Dark,
                  })}
                >
                  {gadget.ram}
                </p>
              </div>

              <div className={styles.about__info}>
                <p
                  className={cn({
                    [styles['about__info--name']]: theme === Theme.Light,
                    [styles['about__info--name-dark']]: theme === Theme.Dark,
                  })}
                >
                  Built in memory
                </p>
                <p
                  className={cn({
                    [styles['about__info--value']]: theme === Theme.Light,
                    [styles['about__info--value-dark']]: theme === Theme.Dark,
                  })}
                >
                  {gadget.capacity}
                </p>
              </div>

              <div className={styles.about__info}>
                <p
                  className={cn({
                    [styles['about__info--name']]: theme === Theme.Light,
                    [styles['about__info--name-dark']]: theme === Theme.Dark,
                  })}
                >
                  Camera
                </p>
                <p
                  className={cn({
                    [styles['about__info--value']]: theme === Theme.Light,
                    [styles['about__info--value-dark']]: theme === Theme.Dark,
                  })}
                >
                  {gadget.camera}
                </p>
              </div>

              <div className={styles.about__info}>
                <p
                  className={cn({
                    [styles['about__info--name']]: theme === Theme.Light,
                    [styles['about__info--name-dark']]: theme === Theme.Dark,
                  })}
                >
                  Zoom
                </p>
                <p
                  className={cn({
                    [styles['about__info--value']]: theme === Theme.Light,
                    [styles['about__info--value-dark']]: theme === Theme.Dark,
                  })}
                >
                  {gadget.zoom}
                </p>
              </div>

              <div className={styles.about__info}>
                <p
                  className={cn({
                    [styles['about__info--name']]: theme === Theme.Light,
                    [styles['about__info--name-dark']]: theme === Theme.Dark,
                  })}
                >
                  Cell
                </p>
                <p
                  className={cn({
                    [styles['about__info--value']]: theme === Theme.Light,
                    [styles['about__info--value-dark']]: theme === Theme.Dark,
                  })}
                >
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
