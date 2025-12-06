/* eslint-disable max-len */
import { ModelCard } from '../ModelCard/ModelCard';
import styles from './ItemsSlider.module.scss';
import { useRef } from 'react';
import { AccessoriesModel, PhoneModel, TabletModel } from '../../types/model';
import { Product } from '../../types/products';
import { SkeletonCard } from '../SkeletonCard';
import arrowLeft from '../../Icons/ChevronArrowLeft.svg';
import arrowRight from '../../Icons/ChevronArrowRight.svg';

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
            <img src={arrowLeft} alt="" className={styles.slider__svg} />
          </button>
          <button
            className={styles.button}
            onClick={handleNext}
            disabled={isLoading}
          >
            <img src={arrowRight} alt="" className={styles.slider__svg} />
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
