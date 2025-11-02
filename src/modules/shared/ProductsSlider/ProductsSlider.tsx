/* eslint-disable max-len */
import classNames from 'classnames';
import styles from './ProductsSlider.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useElementWidth } from './hooks/useElementWidth';
import { Product } from '../../../types/data';
import { ProductItem } from '../ProductItem/ProductItem';
import { useScrollLoad } from './hooks/useScrollLoad';

type Props = {
  title: string;
  products: Product[];
  discount: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  discount,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const loadedProducts = useMemo(() => {
    return products.slice(0, currentIndex + itemsPerPage * 2);
  }, [currentIndex, itemsPerPage, products]);
  const slider = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    const currentNode = slider?.current;

    if (!currentNode) {
      return;
    }

    const w = currentNode.getBoundingClientRect();
    const item = currentNode.firstElementChild;

    if (!item) {
      return;
    }

    const itemData = item.getBoundingClientRect();
    const itemsCount = Math.floor(w.width / itemData.width);

    setItemsPerPage(itemsCount);
  }, [sliderWidth]);

  useElementWidth(slider, w => {
    setSliderWidth(w);
  });

  useScrollLoad(slider, () => {
    setCurrentIndex(prev => Math.min(prev + itemsPerPage, products.length));
  });

  const move = (newIndex: number) => {
    const currentNode = slider?.current;

    if (!currentNode) {
      return;
    }

    const containerStiles = getComputedStyle(currentNode);
    const item = currentNode.firstElementChild;

    if (!item) {
      return;
    }

    currentNode.scrollTo({
      left:
        newIndex *
        (item.getBoundingClientRect().width + parseFloat(containerStiles.gap)),
      behavior: 'smooth',
    });

    setCurrentIndex(newIndex);
  };

  return (
    <section className={classNames(styles.slider)}>
      <div className={classNames(styles.slider__container)}>
        <h2 className={classNames(styles.slider__title)}>{title}</h2>
        <div className={classNames(styles.slider__buttons)}>
          <button
            className={classNames(styles.slider__button)}
            data-cy="left"
            onClick={() => move(currentIndex - itemsPerPage)}
            disabled={currentIndex - itemsPerPage + 1 <= 0}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              className={classNames(styles['slider__button--img'])}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
              />
            </svg>
          </button>
          <button
            className={classNames(styles.slider__button)}
            data-cy="right"
            onClick={() => move(currentIndex + itemsPerPage)}
            disabled={currentIndex >= products.length - itemsPerPage}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              className={classNames(styles['slider__button--img'])}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
              />
            </svg>
          </button>
        </div>
        <div className={classNames(styles.slider__content)} ref={slider}>
          {loadedProducts.map(p => (
            <div key={p.id} className={classNames(styles.slider__item)}>
              <ProductItem item={p} discount={discount} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
