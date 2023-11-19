import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useResponseHook } from '../../hooks/useResponseHook';
import './slider.scss';

type Props = {
  children: React.ReactNode[];
  // step use negative number for move track
  step: number;
  setStep: (value: number) => void;
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
  countElement?: number;
  items?: boolean;
};

export const Slider: React.FC<Props> = ({
  children,
  step,
  setStep,
  leftButton,
  rightButton,
  countElement = 1,
  items,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [widthStep, setWidthStep] = useState<number>(0);
  const [transition, setTransition] = useState(true);
  const [widthElement, setWidthElement] = useState(0);
  const [margin, setMargin] = useState({ left: 0, rigth: 0 });
  const [buttons, setButtons] = useState(
    [...Array(Math.ceil(children.length / countElement))].map(() => true),
  );
  const width = useResponseHook();

  useEffect(() => {
    setButtons(
      [...Array(Math.ceil(children.length / countElement))]
        .map(() => 1)
        .map(() => true),
    );
  }, [countElement]);

  useEffect(() => {
    if (ref.current) {
      const element = document.querySelector(
        `.${ref.current.children[0].className}`,
      ) as any;
      const elementWidth = element.offsetWidth;
      const marginLeft = parseInt(
        getComputedStyle(element as Element).marginLeft,
        10,
      );
      const marginRight = parseInt(
        getComputedStyle(element as Element).marginRight,
        10,
      );

      setMargin({ left: marginLeft, rigth: marginRight });
      if (!widthElement) {
        setWidthElement(
          (marginRight + marginLeft + elementWidth) * countElement,
        );
      }

      setWidthElement((marginRight + marginLeft + elementWidth) * countElement);
    }
  }, [width, widthElement]);

  const next = () => {
    if (!transition) {
      setStep(step - 1);
    }
  };

  const prev = () => {
    if (!transition) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    const backTimerId = () => {
      return setTimeout(() => {
        setTransition(true);
        setStep(-Math.ceil(children.length / countElement));
      }, 200);
    };

    const startTimerId = () => {
      return setTimeout(() => {
        setTransition(true);
        setStep(-1);
      }, 200);
    };

    if (step === 0) {
      backTimerId();
    }

    if (Math.abs(step) > children.length / countElement) {
      startTimerId();
    }

    return () => {
      clearTimeout(backTimerId());
      clearTimeout(startTimerId());
    };
  }, [step]);

  useEffect(() => {
    const onAnimationTimerId = () => {
      return setTimeout(() => setTransition(false), 100);
    };

    if (transition) {
      onAnimationTimerId();
    }

    return () => clearTimeout(onAnimationTimerId());
  }, [transition]);

  useEffect(() => {
    setWidthStep(widthElement);
  }, [width, widthElement, countElement]);

  return (
    <div className="slider-container">
      <div className="wrapper-content">
        <button onClick={prev} type="button" className="button">
          {leftButton}
        </button>
        <div className="slider-window" style={{ width: `${widthElement}px` }}>
          <div
            className={classNames('tracer', {
              'transition-without-animation': transition,
            })}
            style={{ transform: `translate(${step * widthStep}px)` }}
          >
            <div
              ref={ref}
              style={{
                marginLeft: `${margin.left}px`,
                marginRight: `${margin.rigth}px`,
              }}
            >
              {children[children.length - 1]}
            </div>
            {children}
            {children}
          </div>
        </div>
        <button type="button" onClick={next} className="button">
          {rightButton}
        </button>
      </div>
      <div className="slider-buttom">
        {items
          && buttons.map((el, index) => (
            <button
              type="button"
              className={classNames({
                active: -(index + 1) === step,
              })}
              onClick={() => {
                setStep(-(index + 1));
              }}
              key={Math.random() * (100 - 1) + 1}
            >
              {el}
            </button>
          ))}
      </div>
    </div>
  );
};
