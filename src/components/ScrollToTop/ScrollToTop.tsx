import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const location = useLocation(); // Get current location

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location.pathname]); // Re-run effect when pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
