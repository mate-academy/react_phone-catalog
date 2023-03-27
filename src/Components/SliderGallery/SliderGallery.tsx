import classNames from 'classnames';
import {
  FC,
  useMemo,
  useRef,
  useState,
} from 'react';
import './SliderGallery.scss';

export const SliderGallery: FC = ({ children }) => {
  const divImgBlock = useRef<HTMLDivElement>(null);
  const [imgWidthMove, setImgWidthMove] = useState(0);
  const amountChildren = divImgBlock.current?.childElementCount || 0;
  const widthDiv = divImgBlock.current?.clientWidth || 0;

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     if (!amountChildren && !widthDiv) {
  //       return;
  //     }

  //     setImgWidthMove((prevState) => {
  //       if (prevState + widthDiv >= amountChildren * widthDiv) {
  //         return 0;
  //       }

  //       return prevState + widthDiv;
  //     });
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timerId);
  //   }
  // }, [imgWidthMove]);

  const hendlerPrev = () => {
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
    <div className="slider homePage__gallerySlider">
      <div className="slider__content">
        {/* eslint-disable-next-line */}
        <button
          type="button"
          onClick={hendlerPrev}
          className="slider__button slider__button--prev"
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
          className="slider__button slider__button--next"
        />
      </div>
      <div className="slider__lables">
        <span
          className={classNames(
            'slider__lable',
            { 'slider__lable--active': false },
          )}
        />
        <span
          className={classNames(
            'slider__lable',
            { 'slider__lable--active': false },
          )}
        />
        <span
          className={classNames(
            'slider__lable',
            { 'slider__lable--active': true },
          )}
        />
        <span
          className={classNames(
            'slider__lable',
            { 'slider__lable--active': false },
          )}
        />
      </div>
    </div>
  );
};
