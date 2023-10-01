import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './Carusel.scss';

import caruselPhotoA from '../../images/carusel/banner-phones.png';
import caruselPhotoB from '../../images/carusel/banner-tablets.png';
import caruselPhotoC from '../../images/carusel/banner-accessories.png';
import { TIME_TRANSIT_CARUSEL } from '../../helpers/consts';

const widthDesktop = 1250;
const widthTablet = 744;
const imagesoForCarusel = [
  caruselPhotoA,
  caruselPhotoB,
  caruselPhotoC,
];
const quantityImgsOfCarusel = imagesoForCarusel.length - 1;
const gapOfCarusel = 40;
const getStartWidthImg = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth < widthDesktop) {
    if (windowWidth < widthTablet) {
      return windowWidth - 40;
    }

    return windowWidth - 144;
  }

  return 1020;
};

export const Carusel: React.FC = () => {
  const [caruselsImg, setCaruselsImg] = useState<number>(0);
  const [moveRight, setMoveRight] = useState<number>(0);
  const [widthImg, setWidthImg] = useState<number>(getStartWidthImg);
  const [isDeleteInfinit, setIsDeleteInfinit] = useState<boolean>(false);

  const widthCaruselsImgWithGap = widthImg + gapOfCarusel;
  let timerFlipping = 0;

  const handlerPrevImg = () => {
    if (caruselsImg === 0) {
      setCaruselsImg(quantityImgsOfCarusel);
      setMoveRight(-widthCaruselsImgWithGap * quantityImgsOfCarusel);
    } else {
      setCaruselsImg(currentImg => currentImg - 1);
      setMoveRight(current => current + widthCaruselsImgWithGap);
    }
  };

  const handlerNextImg = () => {
    if (caruselsImg === quantityImgsOfCarusel) {
      setCaruselsImg(0);
      setMoveRight(0);
    } else {
      setCaruselsImg(currentImg => currentImg + 1);
      setMoveRight(current => current - widthCaruselsImgWithGap);
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
        {imagesoForCarusel.map(image => (
          <div
            key={image}
            className={classNames(
              'carusel__point',
              {
                'is-selected': caruselsImg === imagesoForCarusel
                  .indexOf(image),
              },
            )}
          />
        ))}
      </div>
    </div>
  );
};
