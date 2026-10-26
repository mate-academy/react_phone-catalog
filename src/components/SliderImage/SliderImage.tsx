import cn from 'classnames';
import styles from './SliderImage.module.scss';
import { useSlider } from '../../hooks/useSlider';
import { useEffect } from 'react';
import { SliderData } from '../../types/Types';

type Props = { sliderData: SliderData[] };

export const SliderImage: React.FC<Props> = ({ sliderData }) => {
  const {
    currentSlide,
    showNextSlide,
    showPreviousSlide,
    showSlide,
    handleSwipe,
  } = useSlider(sliderData.length);

  useEffect(() => {
    const sliderUpdate = setInterval(showNextSlide, 5000);

    return () => clearInterval(sliderUpdate);
  }, [currentSlide, showNextSlide]);

  return (
    <article className={styles.sliderImage}>
      <button
        onClick={showPreviousSlide}
        className={cn(styles.prevBtn, styles.btns)}
      ></button>

      <div className={styles.track}>
        <ul
          className={styles.list}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderData.map(data => (
            <li
              key={data.src}
              className={styles.slide}
              onPointerDown={event => handleSwipe(event, data.to)}
              onPointerUp={event => handleSwipe(event, data.to)}
            >
              <img src={data.src} className={styles.image} draggable={false} />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={showNextSlide}
        className={cn(styles.nextBtn, styles.btns)}
      ></button>

      <ul className={styles.dots}>
        {sliderData.map((data, i) => (
          <li key={data.src}>
            <button
              onClick={() => showSlide(i)}
              className={cn(styles.dot, i === currentSlide && styles.active)}
            ></button>
          </li>
        ))}
      </ul>
    </article>
  );
};
