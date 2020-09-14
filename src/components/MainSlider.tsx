import React, { useState } from 'react';
import { Slider } from './Slider';
import { handleMove } from '../helpers/handleMove';
import { useWindowSize } from '../helpers/useWindowSize';

export const MainSlider: React.FC = () => {
  const [margin, setMargin] = useState(0);
  const width = useWindowSize();
  const maxWidth = width - 440;

  const handleClick = (option: string) => {
    const newMargin = handleMove(option, margin, maxWidth);

    setMargin(newMargin);
  };

  return (
    <div className="main-slider">
      <button
        type="button"
        disabled={margin >= 0}
        className="main-slider__button"
        onClick={() => handleClick('back-slider')}
      >
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.47136 0.528636C5.21101 0.268287 4.7889 0.268287 4.52855 0.528636L0.528555 4.52864C0.268205 4.78899 0.268205 5.2111 0.528555 5.47145L4.52855 9.47145C4.7889 9.7318 5.21101 9.7318 5.47136 9.47145C5.73171 9.2111 5.73171 8.78899 5.47136 8.52864L1.94277 5.00004L5.47136 1.47145C5.73171 1.2111 5.73171 0.788986 5.47136 0.528636Z"
            fill={margin >= 0 ? '#B4BDC4' : 'black'}
          />
        </svg>
      </button>
      <Slider margin={margin} width={maxWidth} />
      <button
        type="button"
        disabled={margin <= -maxWidth * 2}
        className="main-slider__button"
        onClick={() => handleClick('forward-slider')}
      >
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.528636 0.528636C0.788986 0.268287 1.2111 0.268287 1.47145 0.528636L5.47145 4.52864C5.73179 4.78899 5.73179 5.2111 5.47145 5.47145L1.47145 9.47145C1.2111 9.7318 0.788986 9.7318 0.528636 9.47145C0.268287 9.2111 0.268287 8.78899 0.528636 8.52864L4.05723 5.00004L0.528636 1.47145C0.268287 1.2111 0.268287 0.788986 0.528636 0.528636Z"
            fill={margin <= -maxWidth * 2 ? '#B4BDC4' : 'black'}
          />
        </svg>
      </button>
    </div>
  );
};
