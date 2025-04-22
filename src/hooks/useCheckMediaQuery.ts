import { useMediaQuery } from 'react-responsive';

const useCheckMediaQuery = () => {
  const isTablet = useMediaQuery({ maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

  return { isTablet, isMobile };
};

export default useCheckMediaQuery;
