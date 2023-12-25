import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { ArrowDirections } from '../../../../../helpers/enums/ArrowDirections';
import { Arrow } from '../../../../Arrow';
import { CategorySliderImage } from './CategorySliderImage';

const FIVE_SECONDS = 5000;

enum CategoriesNumbers {
  phones = 0,
  tablets = 1,
  accessories = 2,
}

export const CategoriesSlider = () => {
  const [displatedImageNumber, setDidplayedImageNumber] = useState(0);

  const categoryNames = ['phones', 'tablets', 'accessories'];
  const images = categoryNames.map(image => ({
    src: `img/home/slider/banner-${image}.png`,
    alt: image,
  }));

  const areTablets = displatedImageNumber === CategoriesNumbers.tablets;
  const areAccessories = displatedImageNumber === CategoriesNumbers.accessories;

  const bannerClasses = classNames('categories-slider__images', {
    'categories-slider__images--1': areTablets,
    'categories-slider__images--2': areAccessories,
  });

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
    let newImageNumber: number;

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

        <div className="categories-slider__content">
          <ul className={bannerClasses}>
            {images.map(image => {
              const { src, alt } = image;

              return (
                <CategorySliderImage
                  alt={alt}
                  src={src}
                  key={alt}
                />
              );
            })}
          </ul>
        </div>

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
