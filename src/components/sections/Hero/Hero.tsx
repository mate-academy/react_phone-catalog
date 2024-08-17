import { useState } from 'react';
import { SliderHero } from '../../SliderHero';
import './Hero.scss';

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
        <h1 className="hero__title">Welcome to Nice Gadgets store!</h1>
      </div>

      <SliderHero
        banners={banners}
        step={settings.step}
        animationDuration={settings.animationDuration}
        infinite={settings.infinite}
      />
    </section>
  );
};
