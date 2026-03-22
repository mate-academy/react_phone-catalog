import { useEffect } from 'react';
import style from './PicturesSlider.module.scss';
import classNames from 'classnames';
import { Icon } from '../../../components/ui/Icon/Icon';
import { useSwipe } from '../../../hook/useSwipe';

export const PicturesSlider = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const startXRef = useRef(0);
  const pictures = [
    'img/banner-accessories.webp',
    'img/banner-phones.webp',
    'img/banner-tablets.webp',
    'img/banner-1.webp',
    'img/banner-2.webp',
    'img/banner-3.webp',
  ];
  const {
    previosBunner,
    nextBunner,
    handleTouchStart,
    handleTouchEnd,
    currentIndex,
    setCurrentIndex,
  } = useSwipe({
    images: pictures,
  });

  // const nextBunner = useCallback(
  //   () => setCurrentIndex(prevIndex => (prevIndex + 1) % pictures.length),
  //   [pictures.length],
  // );

  // const previosBunner = () =>
  //   setCurrentIndex(
  //     prevIndex => (prevIndex - 1 + pictures.length) % pictures.length,
  //   );

  // const handleTouchStart = (event: React.TouchEvent) => {
  //   startXRef.current = event.touches[0].clientX;
  // };

  // const handleTouchEnd = (event: React.TouchEvent) => {
  //   const endX = event.changedTouches[0].clientX;

  //   if (startXRef.current - endX > 50) {
  //     nextBunner();
  //   } else if (endX - startXRef.current > 50) {
  //     previosBunner();
  //   }
  // };

  useEffect(() => {
    const intervalId = setInterval(nextBunner, 5000);

    return () => clearInterval(intervalId);
  }, [nextBunner]);

  return (
    <section className={style.slider}>
      <button
        onClick={previosBunner}
        className={classNames(
          style.slider__button,
          style['slider__button--left'],
        )}
      >
        <Icon className={style.slider__arrowSlider} nameIcon="left" />
      </button>

      <div
        className={style.slider__container}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={style.slider__viewport}
          style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        >
          {pictures.map(banner => (
            <img
              key={banner}
              className={classNames(style.slider__img, {
                [style['slider__img--contain']]:
                  currentIndex === 3 ||
                  currentIndex === 4 ||
                  currentIndex === 5,
              })}
              src={banner}
              alt={`banner ${currentIndex + 1}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={nextBunner}
        className={classNames(
          style.slider__button,
          style['slider__button--right'],
        )}
      >
        <Icon className={style.slider__arrowSlider} nameIcon="right" />
      </button>

      <div className={style['slider__dots-container']}>
        {pictures.map((_, index) => (
          <button
            key={index}
            className={classNames(style.slider__dot, {
              [style['slider__dot--active']]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};
