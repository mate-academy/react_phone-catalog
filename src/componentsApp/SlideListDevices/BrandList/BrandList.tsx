/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { BrandItem } from '../../ItemDevice/itemDevice';
import cn from 'classnames';

import './BrandList.scss';
import { EnumSizeScreen } from './EnumSizeScreen';
import { DispatchContext, StateContext } from '../../../context/ContextReducer';
import { getPhones } from '../../../utils/functionGet';
import { Loader } from '../../Loader/Loader';
import { Accessorie } from '../../../types/accessories';
import { Phone } from '../../../types/phone';
import { Tablet } from '../../../types/tablets';
import { SlideTitle } from '../../../types/enumSlideDevices';

interface Props {
  devicesForRender:
  | Phone[] | Tablet[] | Accessorie[] | (Phone | Tablet | Accessorie)[];
  title: string;
  slideCount: number;
  discount: boolean;
}

export const BrandList: React.FC<Props> = ({
  devicesForRender,
  title,
  slideCount,
  discount,
}) => {
  const { phones, sizeScreenMargin, darkThem } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    if (windowSize.width >= 320 && windowSize.width <= 689) {
      dispatch({ type: 'setSizeScreen', payload: EnumSizeScreen.small });
    } else if (windowSize.width >= 699 && windowSize.width <= 1199) {
      dispatch({ type: 'setSizeScreen', payload: EnumSizeScreen.medium });
    } else if (windowSize.width >= 1200) {
      dispatch({ type: 'setSizeScreen', payload: EnumSizeScreen.large });
    }

    if (!phones.length) {
      getPhones().then(p => {
        dispatch({ type: 'setPhones', payload: p });
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  const marginForSliding = !slideCount
    ? 0
    : (sizeScreenMargin + 16) * slideCount;

  const handlePrevSlide = () => {
    switch (title) {
      case SlideTitle.brand:
        return dispatch({ type: 'prevSlidePhone' });

      case SlideTitle.hot:
        return dispatch({ type: 'prevSlideHot' });

      case SlideTitle.aloLike:
        return dispatch({ type: 'prevSlideLike' });
    }
  };

  const handleNextSlide = () => {
    switch (title) {
      case SlideTitle.brand:
        return dispatch({ type: 'nextSlidePhone' });

      case SlideTitle.hot:
        return dispatch({ type: 'nextSlideHot' });

      case SlideTitle.aloLike:
        return dispatch({ type: 'nextSlideLike' });
    }
  };

  return (
    <div className="BrandList">
      <div className="BrandList__top">
        <h2 className="BrandList__title">{title}</h2>

        <div className="BrandList__slide-buttons">
          <button
            disabled={!slideCount}
            onClick={handlePrevSlide}
            className={cn(
              'BrandList__slide-button BrandList__slide-button--left',
              { disable: !slideCount, dark: darkThem },
            )}
          ></button>

          <button
            disabled={+slideCount === 40}
            onClick={handleNextSlide}
            className={cn(
              'BrandList__slide-button BrandList__slide-button--right',
              { disable: +slideCount === 40, dark: darkThem },
            )}
          ></button>
        </div>
      </div>

      {!devicesForRender.length ? (
        <div className="BrindList__loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="BrandList__items">
            <div
              className="BrandList__items__prevMargin"
              style={{ margin: `0 -${marginForSliding}px 0 0 ` }}
            ></div>

            {devicesForRender.map(phone => (
              <BrandItem key={phone.id} device={phone} discount={discount} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
