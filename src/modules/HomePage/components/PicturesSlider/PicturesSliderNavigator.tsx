import cn from 'classnames';
import React from 'react';
import { createNumeratedArray } from '../../../../mocks/Functions/functions';

interface PicturesNavigatorProps {
  activeIndex: number;
  amountOfItems: number;
  onClick: (index: number) => void;
}

export const PicturesSliderNavigator: React.FC<PicturesNavigatorProps> = ({
  activeIndex,
  amountOfItems,
  onClick,
}) => {
  const arr = createNumeratedArray(amountOfItems);

  return (
    <div className="picturesSlider__navigator">
      {arr.map(i => {
        return (
          <div
            key={i}
            className="picturesSlider__rectangleContainer"
            onClick={() => onClick(i)}
          >
            <div
              key={i}
              className={cn('picturesSlider__rectangle', {
                'picturesSlider__rectangle--selected': i === activeIndex,
                'picturesSlider__rectangle--unselected': i !== activeIndex,
              })}
            />
          </div>
        );
      })}
    </div>
  );
};
