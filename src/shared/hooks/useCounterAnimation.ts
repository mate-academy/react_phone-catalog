import { useEffect, useRef, useState } from 'react';

export const useCounterAnimation = (count: number, duration = 400) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current) {
      setIsAnimating(true);
      prevCount.current = count;
      setTimeout(() => setIsAnimating(false), duration);
    }
  }, [count, duration]);

  return isAnimating;
};
