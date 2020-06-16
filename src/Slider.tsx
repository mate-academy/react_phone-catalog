import React, { useState } from 'react';

const Slider = () => {
  const [x, setX] = useState(0);
  const arr = [1, 2, 3, 4];

  const goLeft = () => {
    if (x === 0) {
      setX(-100 * (arr.length - 1));
    } else {
      setX(x + 100);
    }
  };

  const goRight = () => {
    if (x === -100 * (arr.length - 1)) {
      setX(0);
    } else {
      setX(x - 100);
    }
  };

  return (
    <div className="home__slider--box">
      <button
        type="button"
        className="home__goLeft"
        onClick={goLeft}
      >
        <img src="../img/icons/Vleft.svg" alt="right arrow" />
      </button>
      <div className="home__slider">
        {arr.map((item) => (
          <div
            className="home__slide"
            style={{ transform: `translateX(${x}%)` }}
          >
            <img src={`../img/${item}.jpg`} className="home__slider_img" alt="phone img" />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="home__goRight"
        onClick={goRight}
      >
        <img
          src="../img/icons/Vright.svg"
          className="test"
          alt="right arrow"
        />
      </button>
    </div>
  );
};

export default Slider;
