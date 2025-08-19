import React from 'react';
import welcomeSlider from './WelcomeSlider.module.scss';
import { PicturesSlider } from '../PicturesSlider';

export const WelcomeSlider: React.FC = () => {
  return (
    <>
      <div>
        <h1 className={welcomeSlider.title}>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
      </div>
    </>
  );
};
