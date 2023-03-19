import classNames from 'classnames';
import React from 'react';
import './pagination.scss';

type Props = {
  prev: () => void,
  next: () => void,
  currentStep: number;
  stepsCount: string[],
  setCurrenStep: (num:number) => void,
  setNumberStep: (index: number) => void
};

export const Pagination: React.FC<Props> = ({
  prev,
  next,
  currentStep,
  stepsCount,
  setCurrenStep,
  setNumberStep,
}) => {
  const setTep = (index: number) => {
    setCurrenStep(index);
    setNumberStep(index);
  };

  return (
    <div className="wrapper-pagination">
      <button type="button" onClick={prev} className="paggination-arrow">
        <img src="./img/icons/Left.png" alt="left" />
      </button>
      <div className="steps">
        {stepsCount.map((_el:string, index:number) => (
          <button
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => setTep(index)}
            className={classNames('', {
              'active-step': currentStep === index,
            })}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button type="button" onClick={next} className="paggination-arrow">
        <img src="./img/icons/Right.png" alt="right" />
      </button>
    </div>
  );
};
