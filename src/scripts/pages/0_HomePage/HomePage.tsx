import React, { useContext } from 'react';
import { Section } from '../../components/3_Section/Section';
import { Category } from '../../components/4_Category/Category';
import { SliderBanner } from '../../components/1_Slider-banner/Slider-banner';
import { Context } from '../../helpers/context/context';

export const HomePage: React.FC = () => {
  const {
    goods,
  } = useContext(Context);

  const images = [
    '../img/Slider/Banner.png',
    '../img/Slider/3.webp',
    '../img/Slider/banner3.webp',
    '../img/Slider/banner4.webp',
  ];

  return (
    <div className="homePage">
      <main className="homePage__main-container">
        {goods.length > 0 && (
          <>
            <SliderBanner image={images} />
            <Section title="Hot prices" />
            <Category />
            <Section title="Brand new models" />
          </>
        )}
      </main>
    </div>
  );
};
