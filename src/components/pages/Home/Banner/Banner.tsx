import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

type Props = {
  pictures: string[];
};

export const Banner: React.FC<Props> = ({pictures}) => {
  const [isActiveIndex, setIsActiveIndex] = useState(0);

  const {pathname} = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (pathname === "/") {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isActiveIndex, pictures.length]);

  const handlePrev = () => {
    if (isActiveIndex > 0) {
      setIsActiveIndex(prev => prev - 1);
    } else {
      setIsActiveIndex(pictures.length - 1);
    }
  };

  const handleNext = () => {
    if (isActiveIndex < pictures.length - 1) {
      setIsActiveIndex(prev => prev + 1);
    } else {
      setIsActiveIndex(0);
    }
  };

  return (
    <aside className="banner">
      <ul style={{width: `${100 * pictures.length}%`}} className="banner__list">
        {pictures.map((image, i) => (
          <li
            className="banner__item"
            key={i}
            style={{
              transform: `translateX(-${isActiveIndex * 100}%)`,
              transition: "transform 1s ease-in-out",
            }}
          >
            <img
              key={crypto.randomUUID()}
              src={image}
              alt={`banner-${i}`}
              className="banner__img"
            />
          </li>
        ))}
      </ul>

      <button
        className="
            banner__button
            banner__button-prev
          "
        onClick={handlePrev}
      >
        <img src={"/img/banner/icons/arrow-left.svg"} alt="arrow-left" />
      </button>

      <button
        className="
            banner__button
            banner__button-next
          "
        onClick={handleNext}
      >
        <img src={"/img/banner/icons/arrow.svg"} alt="arrow-right" />
      </button>

      <div className="banner__dotnav">
        <ul className="banner__dotnav__list">
          {pictures.map((_, i) => (
            <li key={i} className="banner__dotnav__item">
              <button
                className="banner__dotnav__button"
                onClick={() => setIsActiveIndex(i)}
              >
                <img
                  src={
                    isActiveIndex === i
                      ? "/img/banner/icons/dotnav/dot-active.svg"
                      : "/img/banner/icons/dotnav/dot.svg"
                  }
                  alt="dot"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
