import { useEffect, useRef, useState } from 'react';
import style from './Slider.module.scss';

const slides = [
  {
    id: 1,
    title: 'iPhone 14 Pro',
    description: 'Pro. Beyond',
    img: 'img/assets/homepage/baner_iphone14.png',
  },
  {
    id: 2,
    title: 'iPhone 13 Pro',
    description: 'Pro. Beyond',
    img: 'img/assets/homepage/baner_iphone13.png',
  },
  {
    id: 3,
    title: 'iPhone 12 Pro',
    description: 'Pro. Beyond',
    img: 'img/assets/homepage/baner_iphone12.png',
  },
];

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const firstSlide = { ...slides[slides.length - 1] };
  const lastSlide = { ...slides[0] };
  const fullSlides = [firstSlide, ...slides, lastSlide];
  const lastSlideNumber = slides.length;
  const goToSlide = (number: number) => {
    if (sliderRef.current) {
      const children = Array.from(sliderRef.current.children);

      if (children.length > 1) {
        children[number].scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
  };

  firstSlide.id = slides[0].id - 1;
  lastSlide.id = slides[slides.length - 1].id + 1;

  useEffect(() => {
    goToSlide(1);
  }, []);

  const handleScroll = () => {
    if (sliderRef.current) {
      const slideWidht = sliderRef.current.clientWidth;
      let num = Math.round(sliderRef.current.scrollLeft / slideWidht);

      if (num === 0) {
        num = lastSlideNumber;
      } else if (num === slides.length + 1) {
        num = 1;
      }

      if (sliderRef.current.scrollLeft === 0) {
        goToSlide(lastSlideNumber);
      }

      if (sliderRef.current.scrollLeft === slideWidht * (slides.length + 1)) {
        goToSlide(1);
      }

      setCurrentSlide(num);
    }
  };

  return (
    <div className={style.container}>
      <div
        ref={sliderRef}
        className={style.slider}
        onScrollCapture={handleScroll}
      >
        {fullSlides.map(slide => (
          <div key={slide.id} className={style.slide}>
            <div className="slide__top">
              <p className={style.slide__logo}>
                Now available
                <br />
                in our store!
              </p>
              <p className={style.slide__title}>{slide.title}</p>
              <p className={style.slide__description}>{slide.description}</p>
            </div>
            <div
              className={style.slide__photo}
              style={{
                backgroundImage: `url(${slide.img})`,
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className={style.dots}>
        {slides.map(slide => (
          <div
            key={slide.id}
            className={`${style.dots__dot} ${slide.id === currentSlide ? style['dots__dot--active'] : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
