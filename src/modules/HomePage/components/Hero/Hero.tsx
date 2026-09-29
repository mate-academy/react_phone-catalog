import React from 'react';
import { PromoSlider } from '../PromoSlider';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import './Hero.scss';

type Props = {
  hasError?: boolean;
};

export const Hero: React.FC<Props> = ({ hasError }) => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__top-bar">
          <h2 className="hero__title">Welcome to Nice Gadgets store!</h2>
          <ThemeToggle className="hero__theme-btn" />
        </div>
        <PromoSlider hasError={hasError} />
      </div>
    </section>
  );
};
