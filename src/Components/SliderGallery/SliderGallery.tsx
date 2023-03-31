import {
  FC,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';

export const SliderGallery: FC = ({ children }) => {
  const divImgBlock = useRef<HTMLDivElement>(null);
  const [imgWidthMove, setImgWidthMove] = useState(0);

  useEffect(() => {
    const amountChildrenForTimer = divImgBlock.current?.childElementCount || 0;
    const widthDivForTimer = divImgBlock.current?.clientWidth || 0;
    const fullWidthContainer = amountChildrenForTimer * widthDivForTimer;

    const timerId = setTimeout(() => {
      if (!amountChildrenForTimer && !widthDivForTimer) {
        return;
      }

      setImgWidthMove((prevState) => {
        if (prevState + widthDivForTimer >= fullWidthContainer) {
          return 0;
        }

        return prevState + widthDivForTimer;
      });
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [imgWidthMove]);

  const hendlerPrev = () => {
    const amountChildren = divImgBlock.current?.childElementCount || 0;
    const widthDiv = divImgBlock.current?.clientWidth || 0;

    if (!amountChildren && !widthDiv) {
      return;
    }

    setImgWidthMove((prevState) => {
      if (prevState - widthDiv < 0) {
        return amountChildren * widthDiv - widthDiv;
      }

      return prevState - widthDiv;
    });
  };

  const hendlerNext = () => {
    const amountChildren = divImgBlock.current?.childElementCount || 0;
    const widthDiv = divImgBlock.current?.clientWidth || 0;

    if (!amountChildren && !widthDiv) {
      return;
    }

    setImgWidthMove((prevState) => {
      if (prevState + widthDiv >= amountChildren * widthDiv) {
        return 0;
      }

      return prevState + widthDiv;
    });
  };

  const styleSlider = useMemo(() => ({
    transform: `translate(-${imgWidthMove}px, 0)`,
  }), [imgWidthMove]);

  return (
    <div className="slider">
      <div className="slider__content">
        {/* eslint-disable-next-line */}
        <button
          type="button"
          onClick={hendlerPrev}
          className="icon icon--left slider__button"
        />
        <div className="slider__container">
          <div
            ref={divImgBlock}
            style={styleSlider}
            className="slider__imageBlock"
          >
            {children}
          </div>
        </div>
        {/* eslint-disable-next-line */}
        <button
          type="button"
          onClick={hendlerNext}
          className="icon icon--right slider__button"
        />
      </div>
    </div>
  );
};
