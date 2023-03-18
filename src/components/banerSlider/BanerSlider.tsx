import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useResponseHook } from '../../hooks/useResponseHook';
import './slider.scss';

type Props = {
  listElements: string[]
};

export const BanerSlider:React.FC<Props> = ({ listElements }) => {
  const [step, setStep] = useState(0);
  const [stepWidth, setStepWidth] = useState(1000);
  const width = useResponseHook();

  const next = () => {
    if (step - 1 > -listElements.length) {
      setStep(step - 1);
    }
  };

  const prev = () => {
    if (step < 0) {
      setStep(step + 1);
    }
  };

  const setPoint = (index:number) => {
    if (index > 0) {
      setStep(-index);
    } else {
      setStep(index);
    }
  };

  useEffect(() => {
    if (width > 1200) {
      setStepWidth(1000);
    }

    if (width <= 1200) {
      setStepWidth(600);
    }

    if (width <= 768) {
      setStepWidth(450);
    }
  }, [width]);

  return (
    <div className="wrapper-slider">
      <div className="content">
        <button type="button" className="button" onClick={prev}>
          <img src="./img/icons/Left.png" alt="prev" />
        </button>
        <div className="container">
          {listElements.map((el) => (
            <div
              className="baner"
              style={{ backgroundImage: `url(${el})`, transform: `translate(${step * stepWidth}px)` }}
              key={el}
            />
          ))}
        </div>
        <button
          type="button"
          className="button"
          onClick={next}
        >
          <img src="./img/icons/Right.png" alt="next" />
        </button>
      </div>
      <div className="slider-pointers">
        {listElements.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            type="button"
            className={classNames('slider-point', {
              'is-active': index === Math.abs(step),
            })}
            key={el}
            onClick={() => setPoint(index)}
          />
        ))}
      </div>
    </div>
  );
};
