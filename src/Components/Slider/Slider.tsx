import { useEffect, useState } from 'react';
import { ChevronRight } from '../../SVG/ChevronRight/ChevronRight';
import { ChevronLeft } from '../../SVG/ChevronLeft/ChevronLeft';
import './Slider.scss';

const sliderPictureArray = [
  { image: 1, pos: -1, id: 1 },
  { image: 2, pos: 0, id: 2 },
  { image: 3, pos: 1, id: 3 },
  { image: 4, pos: 2, id: 4 },
  { image: 5, pos: 3, id: 5 },
  { image: 6, pos: 4, id: 6 },
  { image: 7, pos: 5, id: 7 },
];

export const Slider = () => {
  const [slideShow, setSlideShow] = useState(sliderPictureArray);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    if (!transition) {
      return;
    }

    setTimeout(() => {
      setTransition(false);
    }, 700);
  }, [transition]);

  const slideForward = () => {
    if (transition) {
      return;
    }

    const newSlideShow = slideShow.map(el => {
      let { pos } = el;

      if (pos === -1) {
        pos = slideShow.length - 2;
      } else {
        pos -= 1;
      }

      return { ...el, pos };
    });

    setSlideShow(newSlideShow);
    setTransition(true);
  };

  useEffect(() => {
    const timer = setTimeout(slideForward, 3000);

    return () => clearTimeout(timer);
  }, [transition]);

  const slideBack = () => {
    if (transition) {
      return;
    }

    const newSlideShow = slideShow.map(el => {
      let { pos } = el;

      if (pos === slideShow.length - 2) {
        pos = -1;
      } else {
        pos += 1;
      }

      return { ...el, pos };
    });

    setSlideShow(newSlideShow);
    setTransition(true);
  };

  return (
    <div className="Slider">
      <div className="Slider__carusel">
        <button
          type="button"
          className="Slider__btn Slider__btn-Left"
          onClick={() => {
            slideBack();
          }}
        >
          <ChevronLeft classStyle="sliderBtn" />
        </button>
        <div
          className="Slider__image-wrapper"
        >
          {
            slideShow.map(element => {
              return (
                <img
                  key={element.id}
                  src={`./slider/${element.image}.jpg`}
                  alt="unsplash"
                  className={`Slider__image Slider__animation pos${element.pos}`}
                />
              );
            })
          }
        </div>
        <button
          type="button"
          className="Slider__btn Slider__btn-Right"
          onClick={() => {
            slideForward();
          }}
        >
          <ChevronRight classStyle="sliderBtn" />
        </button>
      </div>
      <div className="Slider__dashes">
        {
          slideShow.map(el => {
            return (
              <div
                key={el.id}
                className={`Slider__dash ${el.pos === -1 && 'bold'}`}
              />
            );
          })
        }
      </div>
    </div>
  );
};
