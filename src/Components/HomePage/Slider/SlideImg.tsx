import React from 'react';

type Props = {
  url: string;
  width: number;
  index: number;
};

const SlideImg: React.FC<Props> = ({ url, width, index }) => (
  <>
    <img
      key={index}
      className="slider__img"
      style={{ transform: `translateX(${width}px)` }}
      src={url}
      alt="Android phone"
    />
  </>
);

export default SlideImg;
