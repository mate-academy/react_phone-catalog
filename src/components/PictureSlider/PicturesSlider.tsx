import React, { useState } from 'react';
import { banners } from '../../helpers/utils/constants';
import './PicturesSlider.scss';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';

export const PicturesSlider: React.FC = () => {
  const [image, setImage] = useState(banners[0]);
  const imgAlt = image.slice((image.indexOf('-') + 1), image.lastIndexOf('.'));

  function setNextImg() {
    const nextImgIndex = banners.findIndex(img => img === image);

    setImage(banners[nextImgIndex + 1] || banners[0]);
  }

  function setPrevImg() {
    const prevImg = banners.find((_img, i, imgs) => imgs[i + 1] === image);

    setImage(prevImg || banners[2]);
  }

  setTimeout(setNextImg, 5000);

  return (
    <div className="picture-slider">
      <ButtonIcon
        type="event"
        shape="left-light"
        dynamicClasses={['large']}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={setPrevImg}
      />

      <div className="picture-slider__slides">
        <img
          src={image}
          alt={imgAlt}
          className="picture-slider__img"
        />
      </div>

      <ButtonIcon
        type="event"
        shape="right-light"
        dynamicClasses={['large']}
        onClick={() => setNextImg()}
      />
    </div>
  );
};
