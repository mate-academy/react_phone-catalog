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
        &#60;
      </button>
      <Slider margin={margin} width={maxWidth} />
      <button
        type="button"
        disabled={margin <= -maxWidth * 2}
        className="main-slider__button"
        onClick={() => handleClick('forward-slider')}
      >
        &#62;
      </button>
    </div>
  );
};
