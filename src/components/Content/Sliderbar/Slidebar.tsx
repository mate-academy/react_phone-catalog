import classNames from 'classnames';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoRemoveOutline } from 'react-icons/io5';
import { useState } from 'react';

import style from './Slidebar.module.scss';

const baner = [
  'img/banner-accessories.png',
  'img/banner-phones.png',
  'img/banner-tablets.png',
];

export const Sliderbar = () => {
  const [imgUrl, setImgUrl] = useState(baner[0]);

  setTimeout(() => {
    const index = baner.indexOf(imgUrl);

    if (index === baner.length - 1) {
      return setImgUrl(baner[0]);
    }

    setImgUrl(baner[index + 1]);

    return undefined;
  }, 5000);

  const handleClick = (click: string) => {
    const index = baner.indexOf(imgUrl);

    if (click === 'next') {
      if (index === baner.length - 1) {
        setImgUrl(baner[0]);

        return;
      }

      setImgUrl(baner[index + 1]);

      return;
    }

    if (click === 'previous') {
      if (index === 0) {
        setImgUrl(baner[baner.length - 1]);

        return;
      }

      setImgUrl(baner[index - 1]);
    }
  };

  const getClassIndecator = (e: string) =>
    classNames({ [style.isNotActive]: imgUrl !== e });

  return (
    <div className={style.slider}>
      <div className={style.slider__container}>
        <button
          onClick={() => handleClick('previous')}
          type="button"
          aria-label="previous"
          className={style.slider__button}
        >
          <IoIosArrowBack />
        </button>
        <div className={style.slider__img}>
          <img src={imgUrl} alt="Baner Imeges" />
        </div>
        <button
          onClick={() => handleClick('next')}
          type="button"
          aria-label="next"
          className={style.slider__button}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className={style.slider__indicator}>
        {baner.map((e, index) => (
          <IoRemoveOutline key={+index} className={getClassIndecator(e)} />
        ))}
      </div>
    </div>
  );
};
