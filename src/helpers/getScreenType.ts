import { Resolutions } from '../types/Resolutions';

export const getScreenType = () => {
  switch (true) {
    case window.matchMedia('(min-width: 1366px)').matches: {
      return Resolutions.Desktop;
    }

    case window.matchMedia('(min-width: 768px)').matches: {
      return Resolutions.Tablet;
    }

    case window.matchMedia('(min-width: 480px)').matches: {
      return Resolutions.MobileLarge;
    }

    default: {
      return Resolutions.Mobile;
    }
  }
};
