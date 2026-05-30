import { useMediaQuery } from 'react-responsive';

export const useIsMobile = () => {
  return useMediaQuery({ maxWidth: 640 });
};
