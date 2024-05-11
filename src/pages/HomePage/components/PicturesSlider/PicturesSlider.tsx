import { useEffect, useState } from 'react';
import { Tabs } from '../../../../types/Tabs';
import './PicturesSlider.scss';

export const PicturesSlider = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(1);
  const iconSrc = './icons/slider-icon.svg';
  const activeIconSrc = './icons/slider-icon-active.svg';

  useEffect(() => {
    setInterval(() => {
      setActiveTab((currentTab: Tabs) => {
        return currentTab === 3 ? 1 : ((currentTab + 1) as Tabs);
      });
    }, 2000);
  }, []);

  return (
    <div className="slider">
      <img src="./img/new-phone.png" />

      <div className="tabs slider__tabs">
        <span className="tabs__container">
          <img
            className="tabs__button"
            src={activeTab === 1 ? activeIconSrc : iconSrc}
            onClick={() => setActiveTab(1)}
          />
        </span>
        <span className="tabs__container">
          <img
            className="tabs__button"
            src={activeTab === 2 ? activeIconSrc : iconSrc}
            onClick={() => setActiveTab(2)}
          />
        </span>
        <span className="tabs__container">
          <img
            className="tabs__button"
            src={activeTab === 3 ? activeIconSrc : iconSrc}
            onClick={() => setActiveTab(3)}
          />
        </span>
      </div>
    </div>
  );
};
