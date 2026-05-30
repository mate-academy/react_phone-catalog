import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollUp, setScrollUp] = useState(true);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrollUp(currentScroll < lastScroll);
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollUp;
}
