import { useRef } from 'react';
import Slider from 'react-slick';
import { bannerLength } from '../../utils/bannerLength';
import { ReactComponent as ArrowLeft } from '../../img/icons/VectorLeft.svg';
import { ReactComponent as ArrowRight } from '../../img/icons/VectorRight.svg';

export const Baner: React.FC = () => {
  const slider = useRef<Slider | null>(null);

  const nextBaner = () => {
    if (slider.current) {
      slider.current.slickNext();
    }
  };

  const prevBaner = () => {
    if (slider.current) {
      slider.current.slickPrev();
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: 'linear',
  };

  return (
    <div className="baner px-3">
      <button
        type="button"
        className="button is-paddingless baner__button"
        onClick={prevBaner}
      >
        <ArrowLeft />
      </button>

      <div className="baner__container">
        <Slider ref={slider} {...settings}>
          {bannerLength.map(item => (
            <div key={item} className={`baner__image baner__image--${item}`} />
          ))}
        </Slider>
      </div>

      <button
        type="button"
        className="button is-paddingless baner__button"
        onClick={nextBaner}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
