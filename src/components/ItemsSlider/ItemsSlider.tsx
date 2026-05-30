/* eslint-disable max-len */
import { ModelCard } from '../ModelCard/ModelCard';
import styles from './ItemsSlider.module.scss';
import { useEffect, useRef, useState } from 'react';
import { AccessoriesModel, PhoneModel, TabletModel } from '../../types/model';
import { Product } from '../../types/products';
import { SkeletonCard } from '../SkeletonCard';
import ArrowLeft from '../../Icons/ChevronArrowLeft.svg?react';
import ArrowRight from '../../Icons/ChevronArrowRight.svg?react';

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

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const checkScrollPosition = () => {
    if (!listRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;

    setIsBeginning(scrollLeft <= 0);
    setIsEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
  };

  useEffect(() => {
    const list = listRef.current;

    if (list) {
      checkScrollPosition();
      list.addEventListener('scroll', checkScrollPosition);
    }

    return () => {
      if (list) {
        list.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [models]);

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
            disabled={isLoading || isBeginning}
          >
            <ArrowLeft className={styles.slider__svg} />
          </button>
          <button
            className={styles.button}
            onClick={handleNext}
            disabled={isLoading || isEnd}
          >
            <ArrowRight className={styles.slider__svg} />
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
