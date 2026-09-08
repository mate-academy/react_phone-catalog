/* eslint-disable max-len */
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { SlideOne } from '../../../HomePage/components/TitleSlider/Slides/SlideOne';
import { SlideTwo } from '../../../HomePage/components/TitleSlider/Slides/SlideTwo';
import { SlideThree } from '../../../HomePage/components/TitleSlider/Slides/SlideThree';
import { useAppSelector } from '../../../../app/hooks';

export const AnimatedSlides = () => {
  const activeSlide = useAppSelector(s => s.activeSlideReducer);

  const element =
    activeSlide === 1 ? (
      <SlideOne />
    ) : activeSlide === 2 ? (
      <SlideTwo />
    ) : (
      <SlideThree />
    );

  return (
    <AnimatePresence mode="wait" initial={true}>
      {element ? React.cloneElement(element, { key: activeSlide }) : null}
    </AnimatePresence>
  );
};
