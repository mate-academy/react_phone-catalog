import cn from 'classnames';

import { useEffect, useRef, useState } from 'react';

enum Sides {
  right = 'right',
  left = 'left',
}

export const Header = () => {
  const imgs = [1, 2, 3];
  const [activeImg, setActiveImg] = useState(imgs[0]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setActiveImg(prevImg => (prevImg === 3 ? 1 : prevImg + 1));
    }, 5000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeImg]);

  const handleButtonSlide = (side: Sides) => {
    setActiveImg(prevImg => {
      switch (side) {
        case Sides.right:
          return prevImg === 3 ? 1 : prevImg + 1;
        case Sides.left:
          return prevImg === 1 ? 3 : prevImg - 1;
        default:
          return prevImg;
      }
    });
  };

  return (
    <>
      <header className="header">
        <div className="header__content">
          <div className="header__title-block">
            <h1 className="header__title">
              Welcome to Nice <br className="header__title--br" /> Gadgets
              store!
            </h1>
          </div>
          <div className="header__sliders">
            <div
              className="
                header__sliders-button header__sliders-button--left"
              onClick={() => handleButtonSlide(Sides.left)}
            >
              <div
                className="
                  icon
                  icon--array--left--light
                "
              ></div>
            </div>
            <div
              className="
                header__sliders-button header__sliders-button--right"
              onClick={() => handleButtonSlide(Sides.right)}
            >
              <div
                className="
                  icon
                  icon--array--right--light
                "
              ></div>
            </div>
            <img
              src={`/img/slider-${activeImg}.png`}
              alt={`slider-img-${activeImg}`}
              className="header__sliders--photo"
            />
            <div className="header__sliders--indicators-block">
              {imgs.map(num => (
                <div className="header__sliders--indicator-block" key={num}>
                  <div
                    className={cn('header__sliders--indicator', {
                      'header__sliders--indicator--is-active':
                        num === activeImg,
                    })}
                    onClick={() => {
                      setActiveImg(num);
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
