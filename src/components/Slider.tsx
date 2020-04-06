import React, { FC, useState } from 'react';
import shortid from 'shortid';
import { ImgComponent } from './ImgComponent';

export const Slider: FC = () => {
  const sliderArr = [<ImgComponent src="img/banner_1.png" />,
    <ImgComponent src="img/banner_2.jpg" />];
  const [x, setX] = useState(0);

  const goNext = () => {
    x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
  };

  const goPrev = () => {
    x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
  };

  return (
    <div className="slider">
      {sliderArr.map((item) => (
        <div
          key={shortid.generate()}
          className="slide"
          style={{ transform: `translateX(${x}%)` }}
        >
          {item}
        </div>
      ))}
      <button type="button" className="prev" onClick={goPrev} />
      <button type="button" className="next" onClick={goNext} />
    </div>
  );
};
