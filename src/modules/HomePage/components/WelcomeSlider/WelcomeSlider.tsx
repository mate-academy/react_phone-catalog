import React from 'react';
import welcomeSlider from './WelcomeSlider.module.scss';
import { PicturesSlider } from '../PicturesSlider';

export const WelcomeSlider: React.FC = () => {
  return (
    <>
      <>
        <h2 className={welcomeSlider.title}>Welcome to Nice Gadgets store!</h2>
        <PicturesSlider />
      </>
    </>
  );
};
