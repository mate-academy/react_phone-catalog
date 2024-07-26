import { memo, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import './CustomizedCarousel.scss';
import './../../../shared/styles/Arrow-btn.scss';
import { Link, useNavigate } from 'react-router-dom';
import { SwippingWrapper } from '../../../shared/components/SwippingWrapper';
import { StateContext } from '../../../utils/GlobalStateProvider';

const slides = [
  {
    id: 0,
    img: './img/phones.jpg',
    title: 'Now available in our store!',
    subtitle: 'Be the first!',
    link: 'phones',
  },
  {
    id: 1,
    img: './img/tablets.jpg',
    title: 'Discover the Latest Collection!',
    subtitle: 'Shop today!',
    link: 'tablets',
  },
  {
    id: 2,
    img: './img/accessories.jpg',
    title: 'Exclusive Deals Just for You!',
    subtitle: 'Grab yours now!',
    link: 'accessories',
  },
];

// eslint-disable-next-line react/display-name
export const CustomizedCarousel = memo(() => {
  const { isDarkThemeOn } = useContext(StateContext);
  const [slidePosition, setSlidePosition] = useState(0);
  const sliderInterval = 5000;

  const navigate = useNavigate();

  const handleRedirect = (link: string) => {
    navigate(link);
  }

  const carouselDotStyle = isDarkThemeOn
    ? 'carousel__dot--active'
    : 'carousel__dot--active-dark';

  useEffect(() => {
    const lastPosition = slides.length - 1;

    if (slidePosition < 0) {
      setSlidePosition(lastPosition);
    }

    if (slidePosition > lastPosition) {
      setSlidePosition(0);
    }
  }, [slidePosition]);

  useEffect(() => {
    const slider = setInterval(() => {
      setSlidePosition(slidePosition + 1);
    }, sliderInterval);

    return () => clearInterval(slider);
  }, [slidePosition]);

  return (
    <SwippingWrapper
      handleChangeSlidePosition={setSlidePosition}
      slidePosition={slidePosition}
    >
      <div className="carousel">
        <div className="carousel__main">
          <button
            className={classNames('arrow-btn arrow-btn--left carousel__arrow', {
              'arrow-btn--dark': !isDarkThemeOn,
            })}
            onClick={() => setSlidePosition(slidePosition - 1)}
          ></button>

          <div className="carousel__slides">
            {slides.map((slide, i) => {
              let position = 'next';

              if (i === slidePosition) {
                position = 'active';
              }

              if (
                i === slidePosition - 1 ||
                (slidePosition === 0 && i === slides.length - 1)
              ) {
                position = 'last';
              }

              const { id, img, title, subtitle, link } = slide;

              return (
                <div
                  key={id}
                  onClick={() => handleRedirect(link)}
                  className={classNames('carousel__img-wrapper', `${position}`)}
                >
                  <div className="carousel__card">
                    <div className="carousel__card-info">
                      <h1 className="carousel__card-title">{title}</h1>
                      <h4>{subtitle}</h4>
                    </div>

                    <button
                      className={classNames('carousel__card-button', {
                        'carousel__card-button--dark': !isDarkThemeOn,
                      })}
                    >
                      <Link to={link} className="carousel__card-link">
                        Order now
                      </Link>
                    </button>
                  </div>
                  <div
                    className="carousel__img"
                    style={{
                      backgroundImage: `url(${img})`,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>

          <button
            className={classNames('arrow-btn  carousel__arrow', {
              'arrow-btn--dark': !isDarkThemeOn,
            })}
            onClick={() => setSlidePosition(slidePosition + 1)}
          ></button>
        </div>

        <ul className="carousel__dots">
          {[0, 1, 2].map(elem => (
            <li
              key={elem}
              className={classNames('carousel__dot', {
                'carousel__dot-dark': !isDarkThemeOn,
                [carouselDotStyle]: elem === slidePosition,
              })}
              onClick={() => setSlidePosition(elem)}
            ></li>
          ))}
        </ul>
      </div>
    </SwippingWrapper>
  );
});
