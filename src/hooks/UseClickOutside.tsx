/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

export const UseClickOutside = (handler: () => void) => {
  const domNode = useRef<any>();

  useEffect(() => {
    const isHandler = (event: Event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', isHandler);

    return () => {
      document.removeEventListener('mousedown', isHandler);
    };
  });

  return domNode;
};
