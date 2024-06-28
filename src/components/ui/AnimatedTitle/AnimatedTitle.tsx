import React, { useEffect, useState } from 'react';
import './AminatedTitleStyles.scss';

interface AnimatedTitleProps {
  text: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    // Запускаємо анімацію при зміні тексту
    setIsAnimating(false);
    const timeout = setTimeout(() => {
      setDisplayText(text);
      setIsAnimating(true);
    }, 10); // Коротка затримка перед перезапуском анімації

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <h1 className={`animated-title ${isAnimating ? 'animate' : ''}`}>
      {displayText}
    </h1>
  );
};

export default AnimatedTitle;
