import { useState, useEffect } from 'react';
import loaderGif from './loader.gif';
import './Loader.scss';

export const Loader = () => {
  const loaderText = 'Loading...';
  const textLength = loaderText.length;
  const minLettersAmount = textLength - 3;
  const [visibleLetters, setVisibleLetters] = useState(textLength);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLetters(prevAmount => {
        if (prevAmount === textLength) {
          return minLettersAmount;
        }

        return prevAmount + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <img src={loaderGif} alt="Animated Loader" className="loader__gif" />
      <h2 className="loader__text">{loaderText.slice(0, visibleLetters)}</h2>
    </div>
  );
};
