import { useState, useEffect, useRef } from 'react';

export const useCloseClick = (initialValue: boolean) => {
  const [isActive, setIsActive] = useState(initialValue);
  const ref = useRef(null);

  const handleClick = () => {
    if (ref.current) {
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return [ref, isActive, setIsActive] as const;
};
