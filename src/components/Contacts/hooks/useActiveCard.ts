import { useState } from 'react';

export const useActiveCard = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggleCard = (index: number) => {
    setActiveIndex((previous) => (previous === index ? null : index));
  };

  return { activeIndex, handleToggleCard };
};
