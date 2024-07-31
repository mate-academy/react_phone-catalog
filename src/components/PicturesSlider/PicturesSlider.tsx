import { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';

export const PicturesSlider = () => {
  const slidesRef = useRef<HTMLDivElement | null>(null);

  const dash1Ref = useRef<HTMLDivElement | null>(null);
  const dash2Ref = useRef<HTMLDivElement | null>(null);
  const dash3Ref = useRef<HTMLDivElement | null>(null);

  const intervalId = useRef<number>(0);

  const toPrevSlide = useCallback(() => {
    const slides = slidesRef.current;

    if (!slides) {
      return;
    }

    const width = slides.offsetWidth;
    const scrollWidth = slides.scrollWidth;
    const maxScrollLeft = scrollWidth - width;

    if (slides.scrollLeft < width / 2) {
      slides.scrollLeft = maxScrollLeft;

      return;
    }

    slides.scrollLeft -= width;
  }, []);

  const toNextSlide = useCallback(() => {
    const slides = slidesRef.current;

    if (!slides) {
      return;
    }

    const width = slides.offsetWidth;
    const scrollWidth = slides.scrollWidth;
    const maxScrollLeft = scrollWidth - width;

    if (Math.abs(maxScrollLeft - slides.scrollLeft) < width / 2) {
      slides.scrollLeft = 0;

      return;
    }

    slides.scrollLeft += width;
  }, []);

  const setInterval = useCallback(
    () => window.setInterval(toNextSlide, 5000),
    [toNextSlide],
  );

  const handleSlidesScroll = useCallback(() => {
    window.clearInterval(intervalId.current);

    const slides = slidesRef.current;
    const dash1 = dash1Ref.current;
    const dash2 = dash2Ref.current;
    const dash3 = dash3Ref.current;

    if (!slides || !dash1 || !dash2 || !dash3) {
      return;
    }

    const width = slides.offsetWidth;
    const currScroll = Math.round(slides.scrollLeft);

    switch (currScroll) {
      case 0:
        dash1.className = classNames(styles.dash, styles.dashActive);
        dash2.className = classNames(styles.dash);
        dash3.className = classNames(styles.dash);

        break;

      case width - 1:
      case width:
      case width + 1:
        dash1.className = classNames(styles.dash);
        dash2.className = classNames(styles.dash, styles.dashActive);
        dash3.className = classNames(styles.dash);

        break;

      case 2 * width - 1:
      case 2 * width:
      case 2 * width + 1:
        dash1.className = classNames(styles.dash);
        dash2.className = classNames(styles.dash);
        dash3.className = classNames(styles.dash, styles.dashActive);

        break;

      default:
        break;
    }

    intervalId.current = setInterval();
  }, [setInterval]);

  const handleDashClick = useCallback(
    (index: number): void => {
      window.clearInterval(intervalId.current);

      const slides = slidesRef.current;

      if (!slides) {
        return;
      }

      const width = slides.offsetWidth;

      slides.scrollLeft = index * width;

      intervalId.current = setInterval();
    },
    [setInterval],
  );

  useEffect(() => {
    intervalId.current = setInterval();

    return () => {
      window.clearInterval(intervalId.current);
    };
  }, [setInterval]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <button
          type="button"
          className={classNames(styles.btn, styles.btnPrev)}
          onClick={toPrevSlide}
        />

        <div
          ref={slidesRef}
          className={styles.slides}
          onScroll={handleSlidesScroll}
        >
          <div className={classNames(styles.slide, styles.slide1)} />
          <div className={classNames(styles.slide, styles.slide2)} />
          <div className={classNames(styles.slide, styles.slide3)} />
        </div>

        <button
          type="button"
          className={classNames(styles.btn, styles.btnNext)}
          onClick={toNextSlide}
        />
      </div>

      <div className={styles.dashes}>
        <div
          ref={dash1Ref}
          className={classNames(styles.dash, styles.dashActive)}
          onClick={() => handleDashClick(0)}
        ></div>
        <div
          ref={dash2Ref}
          className={styles.dash}
          onClick={() => handleDashClick(1)}
        ></div>
        <div
          ref={dash3Ref}
          className={styles.dash}
          onClick={() => handleDashClick(2)}
        ></div>
      </div>
    </div>
  );
};
