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

interface Props {
  devicesForRender:
  | Phone[]
  | Tablet[]
  | Accessorie[]
  | (Phone | Tablet | Accessorie)[];
  title: string;
}

export const BrandList: React.FC<Props> = ({ devicesForRender, title }) => {
  const { phones, slidePhoneMargin, sizeScreenMargin, darkThem } =
    useContext(StateContext);
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

  const marginForSliding = !slidePhoneMargin
    ? 0
    : (sizeScreenMargin + 16) * slidePhoneMargin;

  return (
    <div className="BrandList">
      <div className="BrandList__top">
        <h2 className="BrandList__title">{title}</h2>

        <div className="BrandList__slide-buttons">
          <button
            disabled={!slidePhoneMargin}
            onClick={() => {
              dispatch({ type: 'prevSlidePhone' });
            }}
            className={cn(
              'BrandList__slide-button BrandList__slide-button--left',
              { disable: !slidePhoneMargin, dark: darkThem },
            )}
          ></button>

          <button
            disabled={+slidePhoneMargin === 40}
            onClick={() => dispatch({ type: 'nextSlidePhone' })}
            className={cn(
              'BrandList__slide-button BrandList__slide-button--right',
              { disable: +slidePhoneMargin === 40, dark: darkThem },
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
              <BrandItem key={phone.id} device={phone} discount={false} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
