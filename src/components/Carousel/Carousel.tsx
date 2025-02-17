import { CarouselItem } from './CarouselItem';
import iphoneImage from '../../assets/img/Carousel-img/iphone14pro.png';
import tabletImage from '../../assets/img/Carousel-img/banner-tablets.png';
import phonesImage from '../../assets/img/Carousel-img/banner-phones.png';
import style from './Carousel.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSwipe } from '../../services/useSwipe';

export const Carousel = () => {
  const [showImage, setShowImage] = useState(0);

  const items = [
    {
      id: 0,
      description: 'iphone 14 pro available',
      image: iphoneImage,
    },
    {
      id: 1,
      description: 'apple tablets available',
      image: tabletImage,
    },
    {
      id: 2,
      description: 'Iphones in different colors',
      image: phonesImage,
    },
  ];

  const { startSwipe, endSwipe, scrollIndex } = useSwipe(items.length);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowImage(prev =>
        prev >= 0 && prev < items.length - 1 ? prev + 1 : 0,
      );
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [showImage, items.length]);

  return (
    <div
      className={style.carousel}
      onTouchStart={startSwipe}
      onTouchEnd={endSwipe}
    >
      <div
        className={style.inner}
        style={{ transform: `translate(-${scrollIndex * 100}%)` }}
      >
        {items.map(item => (
          <CarouselItem
            image={item.image}
            description={item.description}
            key={item.id}
          />
        ))}
      </div>

      <div className={style.indicators}>
        {items.map(item => (
          <button
            className={style.indicators__buttons}
            key={item.id}
            onClick={() => setShowImage(item.id)}
          >
            <span
              className={classNames(style.indicators__rectangle, {
                [style['indicators__rectangle--active']]: item.id === showImage,
              })}
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
};
