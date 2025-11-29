/* eslint-disable max-len */
import { ModelCard } from '../ModelCard/ModelCard';
import styles from './ItemsSlider.module.scss';
import { useRef } from 'react';
import { AccessoriesModel, PhoneModel, TabletModel } from '../../types/model';
import { Product } from '../../types/products';
import { SkeletonCard } from '../SkeletonCard';

interface Props {
  models: PhoneModel[] | AccessoriesModel[] | TabletModel[] | Product[];
  kindOfModel: 'phones' | 'tablets' | 'accessories' | 'products';
  title: string;
  hotPrice?: boolean;
  isLoading: boolean;
  loaderCards: number[];
}

export const ItemsSlider: React.FC<Props> = ({
  models,
  kindOfModel,
  title,
  hotPrice = false,
  isLoading,
  loaderCards,
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRef = useRef<HTMLLIElement | null>(null);

  const handleNext = () => {
    if (!listRef.current || !itemRef.current) {
      return;
    }

    const itemWidth = itemRef.current.offsetWidth;

    listRef.current.scrollBy({
      left: itemWidth + 16,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    if (!listRef.current || !itemRef.current) {
      return;
    }

    const itemWidth = itemRef.current.offsetWidth;

    listRef.current.scrollBy({
      left: (itemWidth + 16) * -1,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.models__section}>
      <div className={styles.title__wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.slider__buttons}>
          <button
            className={styles.button}
            onClick={handlePrev}
            disabled={isLoading}
          >
            <svg
              className={styles.slider__svg}
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z"
                fill="#B4BDC4"
              />
            </svg>
          </button>
          <button
            className={styles.button}
            onClick={handleNext}
            disabled={isLoading}
          >
            <svg
              className={styles.slider__svg}
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
                fill="#B4BDC4"
              />
            </svg>
          </button>
        </div>
      </div>
      <ul className={styles.models} ref={listRef}>
        {isLoading ? (
          <SkeletonCard cards={loaderCards}></SkeletonCard>
        ) : (
          models.map((model, index) => (
            <li
              key={model.id || index}
              className={styles.models__item}
              ref={index === 0 ? itemRef : null}
            >
              <ModelCard
                kindOfModel={kindOfModel}
                model={model}
                hotPrice={hotPrice}
              />
            </li>
          ))
        )}
      </ul>
    </section>
  );
};
