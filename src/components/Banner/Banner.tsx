import { FunctionComponent, useEffect, useState } from 'react';
import classNames from 'classnames';

// Styles
import './Banner.scss';

// Components
import { Button } from '../Button';

// Types
import { ButtonCallback } from '../../types/ButtonCallback';

export const Banner: FunctionComponent = () => {
  const [selectedImgNum, setSelectedImgNum] = useState<number>(1);
  const imagesNumbers = [1, 2, 3];

  const increaseNum: ButtonCallback = () => {
    if (selectedImgNum >= 1) {
      setSelectedImgNum(selectedImgNum + 1);
    }

    if (selectedImgNum === 3) {
      setSelectedImgNum(1);
    }
  };

  const decreaseNum: ButtonCallback = () => {
    if (selectedImgNum <= 3) {
      setSelectedImgNum(selectedImgNum - 1);
    }

    if (selectedImgNum === 1) {
      setSelectedImgNum(3);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      increaseNum();
    }, 5000);

    return () => {
      clearInterval(timerId);
    };
  }, [selectedImgNum]);

  return (
    <section className="Banner">
      <Button
        disablet={false}
        classModificator="Button--bannerLeft"
        callback={decreaseNum}
      />

      <div className="Banner__imageWrapper">
        {imagesNumbers.map(imageNamber => (
          <img
            key={imageNamber}
            src={`img/banner/Image_${imageNamber}.jpg`}
            alt="phones"
            className={classNames('Banner__image', { 'Banner__image--selected': imageNamber === selectedImgNum })}
          />
        ))}
      </div>

      <Button
        disablet={false}
        classModificator="Button--bannerRight"
        callback={increaseNum}
      />

      <div className="Banner__pagination">
        {imagesNumbers.map(imageNumber => (
          <button
            type="button"
            key={imageNumber}
            className={classNames('Banner__paginationItem', { 'Banner__paginationItem--selected': imageNumber === selectedImgNum })}
            onClick={() => setSelectedImgNum(imageNumber)}
          >
            {}
          </button>
        ))}
      </div>
    </section>
  );
};
