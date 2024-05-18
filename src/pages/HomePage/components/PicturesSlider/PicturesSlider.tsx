import { SetStateAction, useEffect, useState } from 'react';
import cn from 'classnames';
import { Tabs } from '../../../../types/Tabs';
import './PicturesSlider.scss';

export const PicturesSlider = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(1);
  const iconSrc = './icons/slider-icon.svg';
  const activeIconSrc = './icons/slider-icon-active.svg';

  const bannerClass = cn('banner', `banner--${activeTab}`);

  useEffect(() => {
    setInterval(() => {
      setActiveTab((currentTab: Tabs) => {
        return currentTab === 3 ? 1 : ((currentTab + 1) as Tabs);
      });
    }, 2000);
  }, []);

  const slideList = [1, 2, 3];

  return (
    <div className="slider">
      <div className={bannerClass}></div>

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
