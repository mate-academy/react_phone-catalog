import { useState } from 'react';
import { PicturesSlider } from '../PicturesSlider';

export const Hero = () => {
  const banners = [
    {
      img: './img/banners/banner-1.png',
      title: 'iPhone 14 Pro',
      subTitle: 'Pro. Beyond.',
      href: '#',
    },
    {
      img: './img/banners/banner-2.png',
      title: 'iPhone 14',
      subTitle: 'Experience the future.',
      href: '#',
    },
    {
      img: './img/banners/banner-3.png',
      title: 'iPhone 15 Pro Max',
      subTitle: 'Big and Bigger.',
      href: '#',
    },
  ];

  const initialSettingsState = {
    step: 1,
    animationDuration: 1000,
    infinite: false,
  };

  const [settings] = useState(initialSettingsState);

  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero__title page-title">
          Welcome to Nice Gadgets store!
        </h1>
      </div>

      <PicturesSlider
        banners={banners}
        step={settings.step}
        animationDuration={settings.animationDuration}
        infinite={settings.infinite}
      />
    </section>
  );
};
