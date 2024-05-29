import { SetStateAction, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Tabs } from '../../../../types/Tabs';
import './PicturesSlider.scss';

export const PicturesSlider = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(1);
  const iconSrc = './icons/slider-icon.svg';
  const activeIconSrc = './icons/slider-icon-active.svg';

  const bannerClass = cn('banner', `banner--${activeTab}`);

  const moveToNextSlide = () => {
    setActiveTab((currentTab: Tabs) => {
      return currentTab === 3 ? 1 : ((currentTab + 1) as Tabs);
    });
  };

  const moveToPreviousSlide = () => {
    setActiveTab((currentTab: Tabs) => {
      return currentTab === 1 ? 3 : ((currentTab - 1) as Tabs);
    });
  };

  useEffect(() => {
    setInterval(() => {
      moveToNextSlide();
    }, 2000);
  }, []);

  const slideList = [1, 2, 3];

  const slider = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sliderCopy = slider;

    let touchstartX = 0;
    let touchendX = 0;

    function checkDirection() {
      if (touchendX < touchstartX) {
        moveToNextSlide();
      }

      if (touchendX > touchstartX) {
        moveToPreviousSlide();
      }
    }

    const handle1 = (e: TouchEvent) => {
      touchstartX = e.changedTouches[0].screenX;
    };

    slider.current?.addEventListener('touchstart', handle1);

    const handle2 = (e: TouchEvent) => {
      touchendX = e.changedTouches[0].screenX;
      checkDirection();
    };

    slider.current?.addEventListener('touchend', handle2);

    return () => {
      sliderCopy.current?.removeEventListener('touchstart', handle1);
      sliderCopy.current?.removeEventListener('touchend', handle2);
    };
  }, []);

  return (
    <div className="slider">
      <div ref={slider} className={bannerClass}></div>

      <div className="tabs slider__tabs">
        {slideList.map((slide: number) => (
          <span key={slide} className="tabs__container">
            <img
              className="tabs__button"
              src={activeTab === slide ? activeIconSrc : iconSrc}
              onClick={() => setActiveTab(slide as SetStateAction<Tabs>)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
