import './Banner.scss';
import { useEffect, useState } from 'react';
import { sliders } from '../../utils/kit';
// eslint-disable-next-line
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';

type BannerSlide = {
  id: number;
  img: string;
};

export const Banner: React.FC = () => {
  const [currentSlider, setCurrentSlider] = useState<BannerSlide[]>(
    sliders.phone,
  );
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const handleBanner = () => {
      if (window.innerWidth >= 640) {
        setCurrentSlider(sliders.descktop);
      } else {
        setCurrentSlider(sliders.phone);
      }
    };

    handleBanner();
    window.addEventListener('resize', handleBanner);

    return () => window.removeEventListener('resize', handleBanner);
  }, []);

  useEffect(() => {
    const intervadId = setInterval(() => {
      setImgIndex(prevImgs => (prevImgs + 1) % currentSlider.length);
    }, 5000);

    return () => clearInterval(intervadId);
  });

  const handleSlideBack = () => {
    setImgIndex(prevImgIndex =>
      prevImgIndex === 0 ? currentSlider.length - 1 : prevImgIndex - 1,
    );
  };

  const handleSlideForward = () => {
    setImgIndex(prevImgIndex =>
      prevImgIndex === currentSlider.length - 1 ? 0 : prevImgIndex + 1,
    );
  };

  const settings = useSwipeable({
    onSwipedLeft: () => handleSlideForward(),
    onSwipedRight: () => handleSlideBack(),
  });

  return (
    <section className="banner" {...settings}>
      <button
        className="banner__button"
        type="button"
        aria-label="Previous"
        onClick={handleSlideBack}
      >
        <div className="icon icon--arrow-left" />
      </button>

      <div className="banner__container">
        {currentSlider?.map(slide => (
          <img
            src={slide.img}
            alt={`slide number ${slide.id}`}
            key={slide.id}
            className="banner__container-image"
            style={{
              transform: `translateX(-${imgIndex * 100}%)`,
            }}
          />
        ))}

        <div className="banner__overlay">
          <header className="banner__overlay__header">
            Now available <br /> in our store!
          </header>
          <p className="banner__overlay__text">Be the first!</p>
          <button className="banner__overlay__button"> ORDER NOW</button>
        </div>
      </div>

      <button
        className="banner__button banner__button-right"
        onClick={handleSlideForward}
        type="button"
        aria-label="Next"
      >
        <div className="icon icon--arrow-right" />
      </button>

      <div className="banner__dots">
        {currentSlider.map((slider, i) => (
          <span
            key={slider.id}
            tabIndex={0}
            role="button"
            onClick={() => setImgIndex(i)}
            onKeyDown={() => setImgIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className="banner__dots-container"
          >
            <div
              className={classNames('banner__dots-dot', {
                ['banner__dots-dot--active']: i === imgIndex,
              })}
            />
          </span>
        ))}
      </div>
    </section>
  );
};
