import { useEffect } from 'react';

export const useScrollLoad = (
  ref: React.RefObject<HTMLElement>,
  onEndReach: () => void,
  offset = 300,
) => {
  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = node;

      if (scrollLeft + clientWidth >= scrollWidth - offset) {
        onEndReach();
      }
    };

    node.addEventListener('scroll', handleScroll);

    return () => node.removeEventListener('scroll', handleScroll);
  }, [ref, onEndReach, offset]);
};
