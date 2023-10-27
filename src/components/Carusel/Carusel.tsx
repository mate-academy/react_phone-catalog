import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './Carusel.scss';

import caruselPhotoA from '../../images/carusel/banner-phones.png';
import caruselPhotoB from '../../images/carusel/banner-tablets.png';
import caruselPhotoC from '../../images/carusel/banner-accessories.png';
import {
  CARUSEL_GAP,
  MIN_WIDTH_DESKTOP,
  MIN_WIDTH_TABLET,
  TIME_TRANSIT_CARUSEL,
  WIDTH_MAIN_DESKTOP,
  WIDTH_MARGINS_MOBILE,
  WIDTH_MARGINS_TABLET,
} from '../../helpers/consts';

const imagesoForCarusel = [
  caruselPhotoA,
  caruselPhotoB,
  caruselPhotoC,
];
const quantityImgsOfCarusel = imagesoForCarusel.length - 1;
const getStartWidthImg = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth < MIN_WIDTH_DESKTOP) {
    if (windowWidth < MIN_WIDTH_TABLET) {
      return windowWidth - WIDTH_MARGINS_MOBILE;
    }

    return windowWidth - WIDTH_MARGINS_TABLET;
  }

  return WIDTH_MAIN_DESKTOP;
};

export const Carusel: React.FC = () => {
  const [caruselsImg, setCaruselsImg] = useState<number>(0);
  const [moveRight, setMoveRight] = useState<number>(0);
  const [widthImg, setWidthImg] = useState<number>(getStartWidthImg);
  const [isDeleteInfinit, setIsDeleteInfinit] = useState<boolean>(false);

  const widthCaruselsImgWithGap = widthImg + CARUSEL_GAP;
  let timerFlipping = 0;

  const handlerPrevImg = () => {
    if (caruselsImg === 0) {
      setCaruselsImg(quantityImgsOfCarusel);
      setMoveRight(-widthCaruselsImgWithGap * quantityImgsOfCarusel);
    } else {
      setCaruselsImg(cImg => cImg - 1);
      setMoveRight(c => c + widthCaruselsImgWithGap);
    }
  };

  const handlerNextImg = () => {
    if (caruselsImg === quantityImgsOfCarusel) {
      setCaruselsImg(0);
      setMoveRight(0);
    } else {
      setCaruselsImg(currentImg => currentImg + 1);
      setMoveRight(c => c - widthCaruselsImgWithGap);
    }
  };

  const handlerClickPrev = () => {
    clearInterval(timerFlipping);
    setIsDeleteInfinit(true);
    handlerPrevImg();
  };

  const handlerClickNext = () => {
    clearInterval(timerFlipping);
    setIsDeleteInfinit(true);
    handlerNextImg();
  };

  const handlerCLickPoint = (index: number) => {
    clearInterval(timerFlipping);
    setIsDeleteInfinit(true);
    setCaruselsImg(index);

    if (index > caruselsImg) {
      const quantityMove = index - caruselsImg;

      setMoveRight(c => c - quantityMove * widthCaruselsImgWithGap);
    }

    if (index < caruselsImg) {
      const quantityMove = caruselsImg - index;

      setMoveRight(c => c + quantityMove * widthCaruselsImgWithGap);
    }
  };

  useEffect(() => {
    if (!isDeleteInfinit) {
      timerFlipping = window
        .setInterval(() => handlerNextImg(), TIME_TRANSIT_CARUSEL);
    }

    return () => clearInterval(timerFlipping);
  }, [caruselsImg, widthImg]);

  useEffect(() => {
    const handlerResize = () => {
      setWidthImg(getStartWidthImg);
      setCaruselsImg(0);
      setMoveRight(0);
    };

    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  return (
    <div className="carusel">
      <div className="carusel__top">
        <button
          onClick={handlerClickPrev}
          type="button"
          aria-label="carusel prev image"
          title="previous images"
          className="
            carusel__button
            carusel__button--left
          "
        />

        <div className="carusel__content">
          <ul
            className="carusel__list"
            style={{ transform: `translateX(${moveRight}px)` }}
          >
            {imagesoForCarusel.map(image => (
              <li className="carusel__item" key={image}>
                <img
                  src={image}
                  alt={image}
                  className="carusel__img"
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          aria-label="carusel next image"
          title="next images"
          className="
          carusel__button
          carusel__button--right
        "
          onClick={handlerClickNext}
        />
      </div>

      <div className="carusel__points">
        {imagesoForCarusel.map((image, index) => (
          <button
            type="button"
            aria-label="image-carusel"
            key={image}
            className={classNames(
              'carusel__point',
              {
                'is-selected': caruselsImg === imagesoForCarusel
                  .indexOf(image),
              },
            )}
            onClick={() => handlerCLickPoint(index)}
          />
        ))}
      </div>
    </div>
  );
};
