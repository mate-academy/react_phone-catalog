import { CSSProperties } from 'react';

const getStyles = (index: number, windowWidth: number): CSSProperties => {
  if (windowWidth <= 680) {
    return {
      width: index === 2 ? '150%' : '100%',
    };
  } else if (windowWidth >= 680 && windowWidth < 800) {
    return {
      width: index === 2 ? '80%' : '100%',
    };
  } else if (windowWidth >= 800 && windowWidth < 880) {
    return {
      width: index === 1 ? '95%' : index === 2 ? '80%' : '100%',
    };
  } else if (windowWidth >= 880 && windowWidth < 1000) {
    return {
      width: index === 1 ? '60%' : index === 2 ? '70%' : '100%',
    };
  } else if (windowWidth >= 1000 && windowWidth < 1200) {
    return {
      width: index === 1 ? '70%' : index === 2 ? '60%' : '100%',
    };
  } else if (windowWidth >= 1200) {
    return {
      width: index === 1 ? '100%' : index === 2 ? '100%' : '100%',
    };
  }

  return {};
};

export default getStyles;
