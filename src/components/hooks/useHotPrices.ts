import { useCallback, useEffect, useMemo, useState, } from 'react';
import { getPhones } from '../../helpers/api';

export const useHotPrices = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [position, setPosition] = useState(0);

  const step = 2;
  const frameSize = 4;
  const itemWidth = 272;
  const marginsWidth = 64;
  const animationDuration = 1000;

  useEffect(() => {
    getPhones()
      .then(data => setPhones(data));
  }, []);

  const hotPricesPhones: Phone[] = useMemo(() => {
    return phones.filter(phone => phone.discount !== 0);
  }, [phones]);

  const stepWidth = itemWidth * step + marginsWidth;
  const frameWidth = itemWidth * frameSize + marginsWidth;
  const carouselWidth = itemWidth * hotPricesPhones.length + marginsWidth;
  const maxPosition = frameWidth - carouselWidth - (2 * marginsWidth);

  const handleSlide = useCallback((direction: string) => {
    if (direction === 'left') {
      if (position + stepWidth > 0) {
        setPosition(0);
      } else {
        setPosition(position + stepWidth);
      }
    } else if (position - stepWidth < maxPosition) {
      setPosition(maxPosition);
    } else {
      setPosition(position - stepWidth);
    }
  }, [position, maxPosition, stepWidth]);

  return {
    hotPricesPhones,
    position,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    handleSlide,
    maxPosition,
  };
};
