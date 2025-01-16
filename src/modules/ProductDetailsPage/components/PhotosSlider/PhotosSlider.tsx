import classNames from 'classnames';
import styles from './PhotosSlider.module.scss';
import { HandleSliderDragEvent } from '../../../shared/types/handlers';
import { useEffect, useRef, useState } from 'react';
import { getPageX } from '../../../shared/functions/functions';
import { PhotoPreviews } from '../PhotoPreviews';
import { Category } from '../../../shared/types/enums';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';

type Props = {
  photos: string[];
  productCategory: Category;
  className?: string;
};

export const PhotosSlider: React.FC<Props> = ({
  photos,
  productCategory,
  className,
}) => {
  const [position, setPosition] = useState(0);
  const [isDragged, setIsDragged] = useState(false);
  const [jumpScroll, setJumpScroll] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);
  const startDragPosition = useRef(0);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const { accessPhonePhoto, accessTabletPhoto, accessAccessoryPhoto } =
    useLanguage().localeTexts;

  const getSlidesWidth = (amountOfSlides: number): number => {
    const list = listRef.current;

    if (list) {
      return amountOfSlides * list.clientWidth;
    }

    return 0;
  };

  const getStep = (start: number, end: number): number => {
    const list = listRef.current;

    if (list) {
      const width = list.clientWidth;
      const distanceToStep = width / 5;

      return Math.ceil((Math.abs(end - start) - distanceToStep) / width);
    }

    return 0;
  };

  const handleSliderDrag = (event: HandleSliderDragEvent) => {
    const list = listRef.current;

    if (isDragged && list) {
      const distance = startX.current - getPageX(event);

      list.scrollLeft = startScrollLeft.current + distance;
    }
  };

  const handleSliderStopDrag = () => {
    const list = listRef.current;

    if (isDragged && list) {
      const { scrollLeft } = list;
      const startScroll = startScrollLeft.current;
      const startPosition = startDragPosition.current;

      setIsDragged(false);

      const distanceStep = getStep(startScroll, scrollLeft);
      const positionStep = getStep(getSlidesWidth(startPosition), scrollLeft);
      const step =
        (distanceStep < positionStep ? distanceStep : positionStep) *
        (scrollLeft > startScroll ? 1 : -1);

      setPosition(startPosition + step);
    }
  };

  const handleSliderStartDrag = (event: HandleSliderDragEvent) => {
    const list = listRef.current;

    if (list) {
      setIsDragged(true);
      startX.current = getPageX(event);

      startDragPosition.current = Math.round(
        list.scrollLeft / list.clientWidth,
      );

      startScrollLeft.current = event.currentTarget.scrollLeft;
      list.scrollLeft = startScrollLeft.current;
    }
  };

  const handlePreviewClick = (newPosition: number) => {
    setPosition(newPosition);
  };

  useEffect(() => {
    setJumpScroll(true);
  }, [photos.length]);

  useEffect(() => {
    const handleResize = () => {
      setJumpScroll(true);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;

    if (!isDragged && list) {
      list.scrollLeft = getSlidesWidth(position);

      if (jumpScroll) {
        setJumpScroll(false);
      }
    }
  }, [position, jumpScroll, isDragged, photos.length]);

  let alt: string;

  switch (productCategory) {
    case Category.Phones:
      alt = accessPhonePhoto;
      break;
    case Category.Tablets:
      alt = accessTabletPhoto;
      break;
    case Category.Accessories:
      alt = accessAccessoryPhoto;
      break;
    default:
      throw new Error('Product category is not valid!!!');
  }

  const getSlides = (): React.JSX.Element[] => {
    const slides: React.JSX.Element[] = [];

    slides.push(
      ...photos.map((photo, index) => (
        <li key={photo} className={styles.PhotoSlide}>
          <img
            src={photo}
            alt={`${alt} ${index + 1}`}
            draggable="false"
            className={styles.Photo}
          />
        </li>
      )),
    );

    return slides;
  };

  return (
    <article className={classNames(styles.PhotosSlider, className)}>
      <div className={styles.Wrapper}>
        <ul
          className={classNames(
            styles.List,
            (isDragged || jumpScroll) && styles.List_dragged,
          )}
          ref={listRef}
          onMouseDown={handleSliderStartDrag}
          onTouchStart={handleSliderStartDrag}
          onMouseMove={handleSliderDrag}
          onTouchMove={handleSliderDrag}
          onMouseUp={handleSliderStopDrag}
          onTouchEnd={handleSliderStopDrag}
          onMouseLeave={handleSliderStopDrag}
        >
          {getSlides()}
        </ul>
      </div>

      <PhotoPreviews
        photos={photos}
        position={position}
        productCategory={productCategory}
        onClick={handlePreviewClick}
        className={styles.PhotoPreviews}
      />
    </article>
  );
};
