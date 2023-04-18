import { Slide } from '../types/Slide';

// const dom = 'https://mate-academy.github.io/react_phone-catalog/';

export const leftButton = '/_new/img/buttons/VectorLeft.svg';
export const rightButton = '/_new/img/buttons/VectorRight.svg';
const phones = '/_new/img/banner-phones.png';
const tablets = '/_new/img/banner-tablets.png';
const accessories = '/_new/img/banner-accessories.png';

export const sliderList = [accessories, phones, tablets];
const { length } = sliderList;
const start = 0;
const end = length - 1;

export const moveFwd = (slide: Slide) => {
  const edit = { ...slide };

  edit.transition = 'transform 0.8s ease-in-out';

  if (slide.position === start) {
    edit.opacity = 0;
    edit.position = end;
  } else {
    edit.opacity = 1;
    edit.position -= 1;
  }

  return edit;
};

export const moveBck = (slide: Slide) => {
  const edit = { ...slide };

  edit.transition = 'transform 0.8s ease-in-out';

  if (slide.position === end) {
    edit.opacity = 0;
    edit.position = start;
  } else {
    edit.opacity = 1;
    edit.position += 1;
  }

  return edit;
};

export const slideStyleObject = (slide: Slide) => {
  if (slide.width) {
    return {
      opacity: `${slide.opacity}`,
      transform: `translate(${slide.position * slide.width}px)`,
      transition: slide.transition,
    };
  }

  return {};
};
