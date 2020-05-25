
import React, { useState, useEffect } from 'react';
import './Gallery.scss';


export const Gallery = ({images}:{images: string[]}) => {
  const [activeImgNum, setActiveImgNum] = useState(0);

  useEffect(() => {
    let slideShow = setTimeout(NextImage, 5000);
    return () => clearTimeout(slideShow);
  }, [activeImgNum])

  const NextImage = () => {
    if(activeImgNum === images.length - 1) {
      setActiveImgNum(0);
    } else {
      setActiveImgNum(activeImgNum + 1);
    }
  }

  return (
    <div className="Gallery">
      <div className="Gallery__wrapper">
        <ul className="Gallery__stripe">
        {images.map((image, index) => (
          <li>
            <button
            className={index === activeImgNum
              ? "Gallery__icon Gallery__icon--active"
              : "Gallery__icon"}
            onClick={() => setActiveImgNum(index)}
            style={{backgroundImage: `url(${image})`}}
            >

            </button>
          </li>
        ))}

        </ul>
      </div>
      <img
      className="Gallery__main"
      src={images[activeImgNum]}
      alt="Phone Photo"/>
    </div>
  )
}


