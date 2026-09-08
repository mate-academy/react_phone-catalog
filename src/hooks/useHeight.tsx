import { useEffect, useState } from 'react';

export const useScrollExists = () => {
  const [showButton, setShowButton] = useState(true);
  const onScroll = () => {
    const pixelsFromTop = window.scrollY;
    const windowHeight = window.innerHeight;

    setShowButton(pixelsFromTop >= windowHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  });

  return showButton;
};
