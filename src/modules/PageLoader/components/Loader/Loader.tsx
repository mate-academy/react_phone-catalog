/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Lottie from 'react-lottie';

import animationData from './lottie/animation.json';

export const Loader: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return <Lottie options={defaultOptions} height={200} width={200} />;
};
