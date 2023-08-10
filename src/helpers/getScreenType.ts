import { Resolutions } from '../types/Resolutions';

export const getScreenType = () => {
  switch (true) {
    case window.matchMedia('(min-width: 1280px)').matches: {
      return Resolutions.Desktop;
    }

    case window.matchMedia('(min-width: 768px)').matches: {
      return Resolutions.Tablet;
    }

    default: {
      return Resolutions.Mobile;
    }
  }
};
