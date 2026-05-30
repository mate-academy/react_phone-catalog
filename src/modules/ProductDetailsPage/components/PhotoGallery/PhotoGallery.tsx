import React, { useEffect } from 'react';
import classNames from 'classnames';

import { PhotoPreviews } from './components';

import styles from './PhotoGallery.module.scss';
import { useSlideIndexDragSlider } from '../../../../hooks';

type Props = {
  productName: string;
  images: string[];
  className?: string;
};

export const PhotoGallery: React.FC<Props> = ({
  productName,
  images,
  className,
}) => {
  const {
    wrapperRef,
    listRef,

    preparedSlides,
    visibleSlideIndex,
    goToIndex,

    isDragging,
    dragHandlers,
  } = useSlideIndexDragSlider({
    slides: images,
    threshold: 50,
    loop: false,
  });

  useEffect(() => {
    goToIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);

  return (
    <div className={classNames(styles.gallery, className)}>
      <div
        className={classNames(styles['photo-slider'], styles.gallery__slider)}
      >
        <div
          ref={wrapperRef}
          className={classNames(styles['photo-slider__wrapper'], {
            [styles['photo-slider__wrapper--dragging']]: isDragging,
          })}
          {...dragHandlers}
        >
          <ul className={styles['photo-slider__list']} ref={listRef}>
            {preparedSlides.map((image, index) => (
              <li key={image + index} className={styles['photo-slider__item']}>
                <img
                  src={image}
                  alt={`${productName} image - ${index + 1}`}
                  draggable={false}
                  className={styles['photo-slider__img']}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PhotoPreviews
        productName={productName}
        images={images}
        currentIndex={visibleSlideIndex}
        onClick={goToIndex}
        className={styles.gallery__previews}
      />
    </div>
  );
};
