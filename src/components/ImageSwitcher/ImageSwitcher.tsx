import React, { useState } from 'react';
import classNames from 'classnames';
import { DetailsPhone } from '../../type/DetailsPhone';

type Props = {
  phone: DetailsPhone | null;
};

export const ImageSwitcher: React.FC<Props> = ({ phone }) => {
  const [currentImg, setCurrentImg] = useState(phone?.images[0]);

  const switchImage = (image: string) => {
    setCurrentImg(image);
  };

  return (
    <div className="imageSwitcher">
      <div className="imageSwitcher__vertical">
        {phone && (
          phone.images.map(image => (
            <button
              type="button"
              className={classNames(
                'imageSwitcher__smallImg',
                {
                  'imageSwitcher__smallImg--selected': image === currentImg,
                },
              )}
              key={image}
              onClick={() => switchImage(image)}
            >
              <img
                src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
                alt={phone.name}
                className="imageSwitcher__optionsImg"
              />
            </button>
          ))
        )}
      </div>

      <div className="imageSwitcher__main">
        {phone && (
          <img
            src={`https://mate-academy.github.io/react_phone-catalog/_new/${currentImg}`}
            alt={phone.name}
            className="imageSwitcher__mainImg"
          />
        )}
      </div>
    </div>
  );
};
