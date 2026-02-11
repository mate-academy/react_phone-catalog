import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useConditionalScroll = () => {
  const location = useLocation();

  useEffect(() => {
    const keepScroll = location.state && location.state.keepScroll;

    if (!keepScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.key, location.state]);
};
