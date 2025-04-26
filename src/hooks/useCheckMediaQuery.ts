import { useMediaQuery } from 'react-responsive';

const useCheckMediaQuery = () => {
  const isTablet = useMediaQuery({ maxWidth: 1199 });
  const isSmallTablet = useMediaQuery({ maxWidth: 850 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

  return { isTablet, isSmallTablet, isMobile };
};

export default useCheckMediaQuery;
