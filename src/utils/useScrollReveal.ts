import { useEffect, useRef } from 'react';

export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    const timeout = setTimeout(() => {
      observer.observe(el);
    }, 50);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [threshold]);

  return ref;
};
