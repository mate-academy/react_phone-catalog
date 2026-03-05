import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  animateHeroReveal,
  animateBooksSection,
  animateSectionEntrance,
} from '../helpers/homePageAnimations';

gsap.registerPlugin(ScrollTrigger);

export const useHomePageIntroAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const newBooksRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const suggestedBooksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      animateHeroReveal(sliderRef.current);
      animateBooksSection(newBooksRef.current);
      animateBooksSection(suggestedBooksRef.current);
      animateSectionEntrance(categoriesRef.current);
    }, containerRef);

    return () => context.revert();
  }, []);

  return {
    containerRef,
    sliderRef,
    newBooksRef,
    categoriesRef,
    suggestedBooksRef,
  };
};
