import { useEffect, useRef } from 'react';
import style from './Slider.module.scss';

const slides = [
  {
    id: 0,
    title: 'iPhone 14 Pro',
    description: 'Pro. Beyond',
    img: 'img/assets/homepage/baner_iphone14.png',
  },
  {
    id: 1,
    title: 'iPhone 13 Pro',
    description: 'Pro. Beyond',
    img: 'img/assets/homepage/baner_iphone13.png',
  },
  {
    id: 2,
    title: 'iPhone 12 Pro',
    description: 'Pro. Beyond',
    img: 'img/assets/homepage/baner_iphone12.png',
  },
];

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const firstSlide = { ...slides[slides.length - 1] };
  const lastSlide = { ...slides[0] };
  const fullSlides = [firstSlide, ...slides, lastSlide];

  firstSlide.id = slides[0].id - 1;
  lastSlide.id = slides[slides.length - 1].id + 1;

  useEffect(() => {
    if (sliderRef.current) {
      const children = Array.from(sliderRef.current.children);

      if (children.length > 1) {
        children[1].scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
  }, []);

  return (
    <div className={style.container}>
      <div ref={sliderRef} className={style.slider}>
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
                background: `url(${slide.img}) center bottom / contain no-repeat`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
