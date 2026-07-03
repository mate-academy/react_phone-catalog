import React, { useEffect, useState, useRef } from 'react';

interface Props {
  value: number;
  duration?: number;
  className?: string;
}

export const AnimatedPrice: React.FC<Props> = ({
  value,
  duration = 300,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const displayValueRef = useRef(value);

  useEffect(() => {
    displayValueRef.current = displayValue;
  }, [displayValue]);

  useEffect(() => {
    const startVal = displayValueRef.current;
    const endVal = value;

    if (startVal === endVal) {
      return;
    }

    let startTime: number | null = null;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const progressEased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(
        startVal + (endVal - startVal) * progressEased,
      );

      setDisplayValue(currentVal);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [value, duration]);

  return <span className={className}>${displayValue}</span>;
};
