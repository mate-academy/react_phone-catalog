import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { ArrowDirections } from '../../../../helpers/enums/ArrowDirections';
import { Arrow } from '../../../Arrow';

const FIVE_SECONDS = 5000;

enum CategoriesNumbers {
  phones = 0,
  tablets = 1,
  accessories = 2,
}

export const CategoriesSlider = () => {
  const [displatedImageNumber, setDidplayedImageNumber] = useState(0);

  let category;

  switch (displatedImageNumber) {
    case CategoriesNumbers.tablets:
      category = 'tablets';
      break;
    case CategoriesNumbers.accessories:
      category = 'accessories';
      break;
    case CategoriesNumbers.phones:
    default:
      category = 'phones';
      break;
  }

  const imageSrc = `img/home/slider/banner-${category}.png`;

  const firstBarClasses = classNames('categories-slider__bar', {
    'categories-slider__bar--visible': displatedImageNumber === 0,
  });

  const secondBarClasses = classNames('categories-slider__bar', {
    'categories-slider__bar--visible': displatedImageNumber === 1,
  });

  const thirdBarClasses = classNames('categories-slider__bar', {
    'categories-slider__bar--visible': displatedImageNumber === 2,
  });

  const handleClickLeft = () => {
    let newImageNumber;

    if (displatedImageNumber === CategoriesNumbers.phones) {
      newImageNumber = CategoriesNumbers.accessories;
    } else {
      newImageNumber = displatedImageNumber - 1;
    }

    setDidplayedImageNumber(newImageNumber);
  };

  const handleClickRight = () => {
    let newImageNumber: number;

    if (displatedImageNumber === CategoriesNumbers.accessories) {
      newImageNumber = CategoriesNumbers.phones;
    } else {
      newImageNumber = displatedImageNumber + 1;
    }

    setDidplayedImageNumber(newImageNumber);
  };

  useEffect(() => {
    const intervalId = setInterval(() => handleClickRight(), FIVE_SECONDS);

    return () => clearInterval(intervalId);
  }, [displatedImageNumber]);

  return (
    <>
      <div className="home__categories-slider categories-slider">
        <Arrow
          direction={ArrowDirections.left}
          buttonExtraClass="categories-slider__nav"
          onClick={handleClickLeft}
        />

        <img
          className="categories-slider__image"
          src={imageSrc}
          alt="Banner"
        />

        <Arrow
          direction={ArrowDirections.right}
          buttonExtraClass="categories-slider__nav"
          onClick={handleClickRight}
        />
      </div>

      <div className="categories-slider__bars">
        <div className={firstBarClasses} />
        <div className={secondBarClasses} />
        <div className={thirdBarClasses} />
      </div>
    </>
  );
};
